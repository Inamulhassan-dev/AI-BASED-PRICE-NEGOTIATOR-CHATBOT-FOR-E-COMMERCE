from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.core.database import get_db
from app.core.security import get_current_user, decode_token
from app.schemas.chat_schema import ChatMessage, ChatResponse
from app.services.nlp_service import NLPService
from app.services.negotiation_engine import NegotiationEngine
from app.services.customer_analysis import CustomerAnalyzer
from app.models.negotiation import Negotiation, NegotiationStatus
from app.models.cart import Cart
from app.models.user import User
import json

router = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id, None)

    async def send_message(self, message: dict, user_id: int):
        ws = self.active_connections.get(user_id)
        if ws:
            await ws.send_json(message)


manager = ConnectionManager()


def _get_or_create_negotiation(user_id: int, cart_id: int, db: Session) -> Negotiation:
    negotiation = (
        db.query(Negotiation)
        .filter(
            Negotiation.user_id == user_id,
            Negotiation.cart_id == cart_id,
            Negotiation.status.in_([NegotiationStatus.INITIATED, NegotiationStatus.IN_PROGRESS]),
        )
        .first()
    )
    if not negotiation:
        cart = db.query(Cart).filter(Cart.id == cart_id).first()
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
        negotiation = Negotiation(
            user_id=user_id,
            cart_id=cart_id,
            status=NegotiationStatus.INITIATED,
            original_amount=cart.total_amount,
            negotiation_rounds=0,
            messages=[],
            expires_at=datetime.utcnow() + timedelta(minutes=30),
        )
        db.add(negotiation)
        db.commit()
        db.refresh(negotiation)
    return negotiation


async def _process_message(user_id: int, message: str, cart_id: int, db: Session) -> dict:
    nlp = NLPService()
    engine = NegotiationEngine(db)
    analyzer = CustomerAnalyzer(db)

    intent = nlp.detect_intent(message)
    sentiment = nlp.analyze_sentiment(message)
    customer_profile = analyzer.analyze_customer(user_id)
    cart_risk = analyzer.calculate_cart_abandonment_risk(user_id, cart_id)

    negotiation = _get_or_create_negotiation(user_id, cart_id, db)

    # Handle accept intent directly
    if intent == "accept_offer" and negotiation.status == NegotiationStatus.IN_PROGRESS:
        negotiation.status = NegotiationStatus.ACCEPTED
        negotiation.accepted_at = datetime.utcnow()
        cart = db.query(Cart).filter(Cart.id == cart_id).first()
        if cart:
            cart.discount_applied = negotiation.discount_offered
            cart.final_amount = negotiation.final_amount
        db.commit()
        return {
            "message": f"🎉 Deal accepted! {negotiation.discount_offered}% discount applied. Your final total is ₹{negotiation.final_amount:.0f}. Happy shopping!",
            "offer": None,
            "negotiation_id": negotiation.id,
            "can_negotiate": False,
            "timestamp": datetime.utcnow().isoformat(),
        }

    offer_result = engine.generate_offer(
        negotiation=negotiation,
        intent=intent,
        sentiment=sentiment,
        customer_profile=customer_profile,
        cart_risk=cart_risk,
    )

    msgs = negotiation.messages or []
    msgs.append({
        "user": message,
        "bot": offer_result["message"],
        "timestamp": datetime.utcnow().isoformat(),
        "offer": offer_result.get("offer"),
    })
    negotiation.messages = msgs
    negotiation.negotiation_rounds += 1
    negotiation.sentiment_score = sentiment
    negotiation.customer_intent = intent
    db.commit()

    return {
        "message": offer_result["message"],
        "offer": offer_result.get("offer"),
        "negotiation_id": negotiation.id,
        "can_negotiate": offer_result.get("can_negotiate", True),
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            response = await _process_message(
                user_id=user_id,
                message=payload.get("message", ""),
                cart_id=payload.get("cart_id"),
                db=db,
            )
            await manager.send_message(response, user_id)
    except WebSocketDisconnect:
        manager.disconnect(user_id)


@router.post("/message", response_model=ChatResponse)
async def send_message(
    chat: ChatMessage,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = await _process_message(
        user_id=current_user.id,
        message=chat.message,
        cart_id=chat.cart_id,
        db=db,
    )
    return result


@router.post("/accept-offer")
async def accept_offer(
    negotiation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    negotiation = (
        db.query(Negotiation)
        .filter(Negotiation.id == negotiation_id, Negotiation.user_id == current_user.id)
        .first()
    )
    if not negotiation:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    if negotiation.status not in [NegotiationStatus.IN_PROGRESS, NegotiationStatus.INITIATED]:
        raise HTTPException(status_code=400, detail="Negotiation not active")

    cart = db.query(Cart).filter(Cart.id == negotiation.cart_id).first()
    if cart:
        cart.discount_applied = negotiation.discount_offered
        cart.final_amount = negotiation.final_amount

    negotiation.status = NegotiationStatus.ACCEPTED
    negotiation.accepted_at = datetime.utcnow()
    db.commit()

    return {
        "message": "🎉 Great! Your discount has been applied!",
        "success": True,
        "discount_applied": negotiation.discount_offered,
        "final_amount": negotiation.final_amount,
    }


@router.get("/history/{cart_id}")
def get_negotiation_history(
    cart_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    negotiation = (
        db.query(Negotiation)
        .filter(Negotiation.user_id == current_user.id, Negotiation.cart_id == cart_id)
        .order_by(Negotiation.created_at.desc())
        .first()
    )
    if not negotiation:
        return {"messages": [], "status": "none"}
    return {
        "messages": negotiation.messages,
        "status": negotiation.status,
        "discount_offered": negotiation.discount_offered,
        "final_amount": negotiation.final_amount,
    }
