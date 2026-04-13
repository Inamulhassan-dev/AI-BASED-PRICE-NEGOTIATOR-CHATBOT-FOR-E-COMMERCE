from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.negotiation import Negotiation, NegotiationStatus
from app.models.product import Product
from app.models.cart import Cart

router = APIRouter()


@router.get("/dashboard")
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")

    total_negotiations = db.query(Negotiation).count()
    accepted = db.query(Negotiation).filter(Negotiation.status == NegotiationStatus.ACCEPTED).count()
    total_users = db.query(User).count()
    total_products = db.query(Product).filter(Product.is_active == True).count()

    conversion_rate = round((accepted / total_negotiations * 100) if total_negotiations > 0 else 0, 1)

    avg_discount = db.query(func.avg(Negotiation.discount_offered)).filter(
        Negotiation.status == NegotiationStatus.ACCEPTED
    ).scalar() or 0

    total_savings = db.query(
        func.sum(Negotiation.original_amount - Negotiation.final_amount)
    ).filter(Negotiation.status == NegotiationStatus.ACCEPTED).scalar() or 0

    return {
        "total_negotiations": total_negotiations,
        "accepted_negotiations": accepted,
        "conversion_rate": conversion_rate,
        "total_users": total_users,
        "total_products": total_products,
        "avg_discount_percent": round(float(avg_discount), 1),
        "total_savings_given": round(float(total_savings), 2),
    }


@router.get("/negotiations")
def get_negotiations(
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")

    negotiations = (
        db.query(Negotiation)
        .order_by(Negotiation.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return [
        {
            "id": n.id,
            "user_id": n.user_id,
            "status": n.status,
            "original_amount": n.original_amount,
            "final_amount": n.final_amount,
            "discount_offered": n.discount_offered,
            "rounds": n.negotiation_rounds,
            "created_at": n.created_at,
        }
        for n in negotiations
    ]
