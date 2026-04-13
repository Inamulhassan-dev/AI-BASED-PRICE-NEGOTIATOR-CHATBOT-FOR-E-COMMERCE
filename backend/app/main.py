from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from app.api import auth, products, cart, chatbot, analytics
from app.core.config import settings
from app.core.database import engine, Base

# Import all models so SQLAlchemy registers them
from app.models import user, product, cart as cart_model, negotiation  # noqa

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Price Negotiator API",
    description="E-commerce platform with AI-powered price negotiation",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(cart.router, prefix="/api/cart", tags=["Cart"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])


@app.get("/")
async def root():
    return {"message": "AI Price Negotiator API", "status": "active"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}


@app.on_event("startup")
async def seed_demo_data():
    """Seed demo products and admin user on first run"""
    from app.core.database import SessionLocal
    from app.models.product import Product
    from app.models.user import User
    from app.core.security import hash_password

    db = SessionLocal()
    try:
        if db.query(Product).count() == 0:
            demo_products = [
                Product(name="Wireless Noise-Cancelling Headphones", description="Premium audio experience with 30hr battery life", category="Electronics", base_price=4999, min_price=3500, max_discount_percent=25, stock=50, image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", rating=4.5, reviews_count=128, is_negotiable=True, tags=["audio", "wireless", "headphones"]),
                Product(name="Smart Fitness Watch", description="Track your health with GPS, heart rate & sleep monitoring", category="Electronics", base_price=8999, min_price=7000, max_discount_percent=20, stock=30, image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", rating=4.3, reviews_count=89, is_negotiable=True, tags=["fitness", "smartwatch", "health"]),
                Product(name="Mechanical Gaming Keyboard", description="RGB backlit, tactile switches, anti-ghosting", category="Electronics", base_price=3499, min_price=2800, max_discount_percent=20, stock=45, image_url="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", rating=4.7, reviews_count=203, is_negotiable=True, tags=["gaming", "keyboard", "rgb"]),
                Product(name="Premium Leather Wallet", description="Genuine leather, RFID blocking, slim design", category="Fashion", base_price=1299, min_price=900, max_discount_percent=30, stock=100, image_url="https://images.unsplash.com/photo-1627123424574-724758594e93?w=400", rating=4.2, reviews_count=56, is_negotiable=True, tags=["wallet", "leather", "rfid"]),
                Product(name="Portable Bluetooth Speaker", description="360° sound, waterproof IPX7, 12hr playtime", category="Electronics", base_price=2999, min_price=2200, max_discount_percent=25, stock=60, image_url="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", rating=4.4, reviews_count=167, is_negotiable=True, tags=["speaker", "bluetooth", "waterproof"]),
                Product(name="Running Shoes Pro", description="Lightweight, breathable mesh, cushioned sole", category="Sports", base_price=3999, min_price=3000, max_discount_percent=20, stock=80, image_url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", rating=4.6, reviews_count=312, is_negotiable=True, tags=["shoes", "running", "sports"]),
                Product(name="Stainless Steel Water Bottle", description="Vacuum insulated, keeps cold 24hr / hot 12hr", category="Sports", base_price=899, min_price=650, max_discount_percent=25, stock=200, image_url="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400", rating=4.8, reviews_count=445, is_negotiable=True, tags=["bottle", "insulated", "eco"]),
                Product(name="Laptop Backpack 30L", description="Anti-theft, USB charging port, waterproof", category="Bags", base_price=2499, min_price=1800, max_discount_percent=28, stock=70, image_url="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", rating=4.5, reviews_count=198, is_negotiable=True, tags=["backpack", "laptop", "travel"]),
            ]
            for p in demo_products:
                db.add(p)

        if db.query(User).filter(User.is_admin == True).count() == 0:
            admin = User(
                email="admin@negotiator.com",
                username="admin",
                hashed_password=hash_password("admin123"),
                full_name="Admin User",
                is_admin=True,
                is_active=True,
            )
            db.add(admin)

        db.commit()
    finally:
        db.close()
