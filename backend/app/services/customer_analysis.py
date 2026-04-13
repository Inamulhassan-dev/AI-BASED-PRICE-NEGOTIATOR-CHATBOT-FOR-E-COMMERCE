from sqlalchemy.orm import Session
from app.models.user import User, UserType
from app.models.cart import Cart
from app.models.negotiation import Negotiation
from typing import Dict
from datetime import datetime, timedelta


class CustomerAnalyzer:
    def __init__(self, db: Session):
        self.db = db

    def analyze_customer(self, user_id: int) -> Dict:
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            return {"type": "new", "value": 0}

        days_since_purchase = None
        if user.last_purchase_date:
            days_since_purchase = (datetime.utcnow() - user.last_purchase_date).days

        avg_order_value = (
            user.total_spent / user.total_purchases if user.total_purchases > 0 else 0
        )

        return {
            "user_type": user.user_type,
            "total_purchases": user.total_purchases,
            "total_spent": user.total_spent,
            "avg_order_value": avg_order_value,
            "days_since_last_purchase": days_since_purchase,
            "cart_abandonment_count": user.cart_abandonment_count,
            "loyalty_points": user.loyalty_points,
        }

    def calculate_cart_abandonment_risk(self, user_id: int, cart_id: int) -> str:
        user = self.db.query(User).filter(User.id == user_id).first()
        cart = self.db.query(Cart).filter(Cart.id == cart_id).first()
        if not user or not cart:
            return "medium"

        risk_score = 0

        if user.cart_abandonment_count > 3:
            risk_score += 30
        elif user.cart_abandonment_count > 1:
            risk_score += 15

        cart_age = (datetime.utcnow() - cart.created_at).seconds / 60
        if cart_age > 30:
            risk_score += 25
        elif cart_age > 15:
            risk_score += 15

        profile = self.analyze_customer(user_id)
        avg_order = profile.get("avg_order_value", 0)
        if avg_order > 0 and cart.total_amount > avg_order * 1.5:
            risk_score += 20

        if user.user_type == UserType.NEW:
            risk_score += 20

        recent_negotiations = (
            self.db.query(Negotiation)
            .filter(
                Negotiation.user_id == user_id,
                Negotiation.created_at > datetime.utcnow() - timedelta(hours=24),
            )
            .count()
        )
        if recent_negotiations > 2:
            risk_score += 15

        if risk_score >= 70:
            return "critical"
        elif risk_score >= 50:
            return "high"
        elif risk_score >= 30:
            return "medium"
        return "low"
