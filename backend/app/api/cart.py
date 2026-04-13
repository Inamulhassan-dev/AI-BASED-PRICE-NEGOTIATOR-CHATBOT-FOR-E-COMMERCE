from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart_schema import CartItemCreate, CartOut

router = APIRouter()


def _recalculate_cart(cart: Cart):
    total = sum(item.original_price * item.quantity for item in cart.items)
    cart.total_amount = total
    cart.final_amount = total - cart.discount_applied


def _get_or_create_cart(user: User, db: Session) -> Cart:
    cart = db.query(Cart).options(
        joinedload(Cart.items).joinedload(CartItem.product)
    ).filter(Cart.user_id == user.id, Cart.is_active == True).first()
    if not cart:
        cart = Cart(user_id=user.id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart


@router.get("/", response_model=CartOut)
def get_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return _get_or_create_cart(current_user, db)


@router.post("/items", response_model=CartOut)
def add_item(
    item_data: CartItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == item_data.product_id, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.stock < item_data.quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    cart = _get_or_create_cart(current_user, db)

    existing = next((i for i in cart.items if i.product_id == item_data.product_id), None)
    if existing:
        existing.quantity += item_data.quantity
    else:
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=item_data.product_id,
            quantity=item_data.quantity,
            original_price=product.base_price,
        )
        db.add(cart_item)

    db.flush()
    _recalculate_cart(cart)
    db.commit()
    
    # Reload cart with product data
    cart = db.query(Cart).options(
        joinedload(Cart.items).joinedload(CartItem.product)
    ).filter(Cart.id == cart.id).first()
    
    return cart


@router.delete("/items/{item_id}", response_model=CartOut)
def remove_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    cart = _get_or_create_cart(current_user, db)
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.cart_id == cart.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.flush()
    _recalculate_cart(cart)
    db.commit()
    
    # Reload cart with product data
    cart = db.query(Cart).options(
        joinedload(Cart.items).joinedload(CartItem.product)
    ).filter(Cart.id == cart.id).first()
    
    return cart


@router.delete("/clear", response_model=CartOut)
def clear_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cart = _get_or_create_cart(current_user, db)
    for item in cart.items:
        db.delete(item)
    cart.total_amount = 0
    cart.discount_applied = 0
    cart.final_amount = 0
    db.commit()
    
    # Reload cart with product data
    cart = db.query(Cart).options(
        joinedload(Cart.items).joinedload(CartItem.product)
    ).filter(Cart.id == cart.id).first()
    
    return cart
