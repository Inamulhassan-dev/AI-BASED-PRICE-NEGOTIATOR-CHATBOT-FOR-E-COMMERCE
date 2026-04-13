"""Initialize database with demo products"""
import sys
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.product import Product
from app.models.user import User
from app.models.cart import Cart, CartItem
from app.models.negotiation import Negotiation
from app.core.security import hash_password

def init_db():
    """Create tables and add demo data"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if products already exist
        existing_products = db.query(Product).count()
        if existing_products > 0:
            print(f"Database already has {existing_products} products. Skipping initialization.")
            return
        
        print("Adding demo products...")
        
        products = [
            Product(
                name="Premium Wireless Headphones",
                description="High-quality wireless headphones with noise cancellation and 30-hour battery life.",
                base_price=4999,
                category="Electronics",
                stock=50,
                image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                is_negotiable=True,
                max_discount_percent=20,
                rating=4.5,
                reviews_count=128
            ),
            Product(
                name="Smart Fitness Watch",
                description="Track your fitness goals with heart rate monitoring, GPS, and sleep tracking.",
                base_price=3499,
                category="Electronics",
                stock=75,
                image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
                is_negotiable=True,
                max_discount_percent=15,
                rating=4.3,
                reviews_count=95
            ),
            Product(
                name="Leather Laptop Bag",
                description="Premium leather laptop bag with multiple compartments and padded protection.",
                base_price=2999,
                category="Accessories",
                stock=30,
                image_url="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
                is_negotiable=True,
                max_discount_percent=25,
                rating=4.7,
                reviews_count=67
            ),
            Product(
                name="Portable Bluetooth Speaker",
                description="Waterproof portable speaker with 360° sound and 12-hour battery life.",
                base_price=1999,
                category="Electronics",
                stock=100,
                image_url="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
                is_negotiable=True,
                max_discount_percent=20,
                rating=4.4,
                reviews_count=203
            ),
            Product(
                name="Ergonomic Office Chair",
                description="Comfortable ergonomic chair with lumbar support and adjustable height.",
                base_price=8999,
                category="Furniture",
                stock=20,
                image_url="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
                is_negotiable=True,
                max_discount_percent=15,
                rating=4.6,
                reviews_count=89
            ),
            Product(
                name="Stainless Steel Water Bottle",
                description="Insulated water bottle keeps drinks cold for 24 hours, hot for 12 hours.",
                base_price=799,
                category="Accessories",
                stock=150,
                image_url="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
                is_negotiable=True,
                max_discount_percent=10,
                rating=4.8,
                reviews_count=312
            ),
            Product(
                name="Wireless Gaming Mouse",
                description="High-precision gaming mouse with customizable RGB lighting and 6 buttons.",
                base_price=2499,
                category="Electronics",
                stock=60,
                image_url="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
                is_negotiable=True,
                max_discount_percent=20,
                rating=4.5,
                reviews_count=156
            ),
            Product(
                name="Cotton T-Shirt Pack (3)",
                description="Pack of 3 premium cotton t-shirts in assorted colors. Comfortable and durable.",
                base_price=1499,
                category="Clothing",
                stock=200,
                image_url="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
                is_negotiable=True,
                max_discount_percent=25,
                rating=4.2,
                reviews_count=445
            ),
        ]
        
        for product in products:
            db.add(product)
        
        db.commit()
        print(f"✅ Successfully added {len(products)} products!")
        
        # Create admin user if doesn't exist
        admin = db.query(User).filter(User.email == "admin@negotiator.com").first()
        if not admin:
            print("Creating admin user...")
            admin = User(
                email="admin@negotiator.com",
                username="admin",
                full_name="Admin User",
                hashed_password=hash_password("admin123"),
                is_admin=True
            )
            db.add(admin)
            db.commit()
            print("✅ Admin user created!")
        
        print("\n" + "="*50)
        print("Database initialization complete!")
        print("="*50)
        print(f"Total products: {db.query(Product).count()}")
        print(f"Total users: {db.query(User).count()}")
        print("\nDemo credentials:")
        print("  Email: admin@negotiator.com")
        print("  Password: admin123")
        print("="*50)
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
