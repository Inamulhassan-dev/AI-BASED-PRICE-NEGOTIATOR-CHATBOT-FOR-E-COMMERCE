import random
from sqlalchemy.orm import Session
from app.models.negotiation import Negotiation, NegotiationStatus
from app.models.cart import Cart
from app.models.product import Product
from app.models.user import User, UserType
from typing import Dict


class NegotiationEngine:
    def __init__(self, db: Session):
        self.db = db
        self.rules = {
            "max_negotiation_rounds": 5,
            "base_discount_percent": 5,
            "max_discount_percent": 25,
            "loyalty_bonus": {
                UserType.NEW: 0,
                UserType.RETURNING: 2,
                UserType.LOYAL: 5,
                UserType.VIP: 10,
            },
            "cart_value_tiers": [
                {"min": 0, "max": 500, "discount": 5},
                {"min": 500, "max": 2000, "discount": 8},
                {"min": 2000, "max": 5000, "discount": 12},
                {"min": 5000, "max": float("inf"), "discount": 15},
            ],
            "abandonment_risk_multiplier": {
                "low": 1.0,
                "medium": 1.2,
                "high": 1.5,
                "critical": 2.0,
            },
        }

    def generate_offer(
        self,
        negotiation: Negotiation,
        intent: str,
        sentiment: float,
        customer_profile: Dict,
        cart_risk: str,
    ) -> Dict:
        cart = self.db.query(Cart).filter(Cart.id == negotiation.cart_id).first()
        if not cart:
            return {"message": "Cart not found", "offer": None}

        user = self.db.query(User).filter(User.id == negotiation.user_id).first()

        base_discount = self._calculate_base_discount(cart.total_amount)
        loyalty_bonus = self.rules["loyalty_bonus"].get(user.user_type, 0)
        risk_multiplier = self.rules["abandonment_risk_multiplier"].get(cart_risk, 1.0)
        sentiment_bonus = max(0, -sentiment * 3) if sentiment < 0 else 0
        round_bonus = min(negotiation.negotiation_rounds * 1.5, 7)

        total_discount = (base_discount + loyalty_bonus + sentiment_bonus + round_bonus) * risk_multiplier
        max_allowed = self._get_max_allowed_discount(cart)
        total_discount = min(total_discount, max_allowed, self.rules["max_discount_percent"])
        total_discount = round(total_discount, 1)

        discount_amount = (cart.total_amount * total_discount) / 100
        final_amount = cart.total_amount - discount_amount

        negotiation.discount_offered = total_discount
        negotiation.final_amount = final_amount
        negotiation.status = NegotiationStatus.IN_PROGRESS

        is_final = negotiation.negotiation_rounds >= self.rules["max_negotiation_rounds"]
        is_time_limited = cart_risk in ["high", "critical"] or negotiation.negotiation_rounds >= 3
        expires_in = 300 if is_time_limited else None

        message = self._generate_offer_message(
            intent=intent,
            discount=total_discount,
            original_amount=cart.total_amount,
            final_amount=final_amount,
            round_number=negotiation.negotiation_rounds,
            is_final=is_final,
        )

        return {
            "message": message,
            "offer": {
                "discount_percent": total_discount,
                "discount_amount": round(discount_amount, 2),
                "original_amount": round(cart.total_amount, 2),
                "final_amount": round(final_amount, 2),
                "savings": round(discount_amount, 2),
                "is_time_limited": is_time_limited,
                "expires_in_seconds": expires_in,
            },
            "can_negotiate": not is_final,
            "negotiation_id": negotiation.id,
        }

    def _calculate_base_discount(self, cart_value: float) -> float:
        for tier in self.rules["cart_value_tiers"]:
            if tier["min"] <= cart_value < tier["max"]:
                return tier["discount"]
        return self.rules["base_discount_percent"]

    def _get_max_allowed_discount(self, cart: Cart) -> float:
        max_discount = 100.0
        for item in cart.items:
            product = self.db.query(Product).filter(Product.id == item.product_id).first()
            if product and product.max_discount_percent < max_discount:
                max_discount = product.max_discount_percent
        return max_discount

    def _generate_offer_message(
        self, intent, discount, original_amount, final_amount, round_number, is_final
    ) -> str:
        savings = original_amount - final_amount
        if is_final:
            msgs = [
                f"🎯 Final offer! {discount}% OFF — Save ₹{savings:.0f}! Total: ₹{final_amount:.0f}",
                f"⚡ Last chance! {discount}% discount — Your price: ₹{final_amount:.0f} (Save ₹{savings:.0f})",
                f"💎 Best deal: {discount}% OFF! Pay only ₹{final_amount:.0f} — Limited time!",
            ]
        elif round_number == 0:
            msgs = [
                f"👋 Welcome! I can offer you {discount}% discount right away! Total: ₹{final_amount:.0f}",
                f"🎉 Great timing! You get {discount}% OFF — New total: ₹{final_amount:.0f}",
                f"✨ Special offer for you: {discount}% discount! Pay ₹{final_amount:.0f} instead of ₹{original_amount:.0f}",
            ]
        else:
            msgs = [
                f"📢 Even better! {discount}% OFF — Save ₹{savings:.0f}! New price: ₹{final_amount:.0f}",
                f"🔥 Improved offer: {discount}% discount! Your total: ₹{final_amount:.0f}",
                f"💪 Let's make this work! {discount}% OFF — Pay ₹{final_amount:.0f}",
            ]
        return random.choice(msgs)
