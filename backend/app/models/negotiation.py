from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Enum, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base
import enum


class NegotiationStatus(str, enum.Enum):
    INITIATED = "initiated"
    IN_PROGRESS = "in_progress"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    EXPIRED = "expired"


class Negotiation(Base):
    __tablename__ = "negotiations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    cart_id = Column(Integer, ForeignKey("carts.id"), nullable=False)
    session_id = Column(String, index=True)
    status = Column(Enum(NegotiationStatus), default=NegotiationStatus.INITIATED)
    original_amount = Column(Float, nullable=False)
    final_amount = Column(Float, nullable=True)
    discount_offered = Column(Float, default=0.0)
    negotiation_rounds = Column(Integer, default=0)
    messages = Column(JSON, default=list)
    customer_intent = Column(String)
    sentiment_score = Column(Float)
    risk_score = Column(Float)
    expires_at = Column(DateTime)
    accepted_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="negotiations")
