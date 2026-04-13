from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text)
    category = Column(String, index=True)
    base_price = Column(Float, nullable=False)
    min_price = Column(Float, nullable=False)
    max_discount_percent = Column(Float, default=20.0)
    stock = Column(Integer, default=0)
    image_url = Column(String)
    images = Column(JSON)
    rating = Column(Float, default=0.0)
    reviews_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    is_negotiable = Column(Boolean, default=True)
    tags = Column(JSON)
    specifications = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cart_items = relationship("CartItem", back_populates="product")
