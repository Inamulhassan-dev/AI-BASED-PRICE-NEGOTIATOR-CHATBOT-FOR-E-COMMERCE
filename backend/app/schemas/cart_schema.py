from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ProductInCart(BaseModel):
    id: int
    name: str
    image_url: str
    base_price: float
    category: str
    
    class Config:
        from_attributes = True


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1


class CartItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    original_price: float
    negotiated_price: Optional[float]
    discount_percent: float
    product: Optional[ProductInCart] = None

    class Config:
        from_attributes = True


class CartOut(BaseModel):
    id: int
    user_id: Optional[int]
    session_id: Optional[str]
    total_amount: float
    discount_applied: float
    final_amount: float
    is_active: bool
    items: List[CartItemOut] = []
    created_at: datetime

    class Config:
        from_attributes = True
