from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    base_price: float
    min_price: float
    max_discount_percent: float = 20.0
    stock: int = 0
    image_url: Optional[str] = None
    images: Optional[List[str]] = None
    is_negotiable: bool = True
    tags: Optional[List[str]] = None
    specifications: Optional[Any] = None


class ProductOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    category: str
    base_price: float
    max_discount_percent: float
    stock: int
    image_url: Optional[str]
    images: Optional[List[str]]
    rating: float
    reviews_count: int
    is_active: bool
    is_negotiable: bool
    tags: Optional[List[str]]
    specifications: Optional[Any]
    created_at: datetime

    class Config:
        from_attributes = True
