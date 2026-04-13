from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base
import enum


class UserType(str, enum.Enum):
    NEW = "new"
    RETURNING = "returning"
    LOYAL = "loyal"
    VIP = "vip"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    phone = Column(String)
    user_type = Column(Enum(UserType), default=UserType.NEW)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    total_purchases = Column(Integer, default=0)
    total_spent = Column(Float, default=0.0)
    loyalty_points = Column(Integer, default=0)
    cart_abandonment_count = Column(Integer, default=0)
    last_purchase_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    carts = relationship("Cart", back_populates="user")
    negotiations = relationship("Negotiation", back_populates="user")
