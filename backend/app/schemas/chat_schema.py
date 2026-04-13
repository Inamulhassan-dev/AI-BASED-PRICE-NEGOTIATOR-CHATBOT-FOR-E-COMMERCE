from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime


class ChatMessage(BaseModel):
    message: str
    cart_id: int


class OfferDetail(BaseModel):
    discount_percent: float
    discount_amount: float
    original_amount: float
    final_amount: float
    savings: float
    is_time_limited: bool
    expires_in_seconds: Optional[int]


class ChatResponse(BaseModel):
    message: str
    offer: Optional[OfferDetail] = None
    negotiation_id: Optional[int] = None
    can_negotiate: bool = True
    success: Optional[bool] = None
    discount_applied: Optional[float] = None
    final_amount: Optional[float] = None
    timestamp: Optional[str] = None
