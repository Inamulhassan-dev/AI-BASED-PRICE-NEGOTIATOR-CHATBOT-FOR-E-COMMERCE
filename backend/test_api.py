"""
Quick API Test Script
Run: python test_api.py
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    print("🔍 Testing health endpoint...")
    r = requests.get(f"{BASE_URL}/health")
    print(f"✅ Health: {r.json()}")
    return r.status_code == 200

def test_register():
    print("\n🔍 Testing user registration...")
    data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "test123",
        "full_name": "Test User"
    }
    r = requests.post(f"{BASE_URL}/api/auth/register", json=data)
    if r.status_code == 200:
        print(f"✅ Registration successful")
        return r.json()["access_token"]
    elif "already registered" in r.text:
        print("⚠️  User exists, trying login...")
        return test_login()
    else:
        print(f"❌ Registration failed: {r.text}")
        return None

def test_login():
    print("\n🔍 Testing login...")
    data = {"email": "test@example.com", "password": "test123"}
    r = requests.post(f"{BASE_URL}/api/auth/login", json=data)
    if r.status_code == 200:
        print(f"✅ Login successful")
        return r.json()["access_token"]
    else:
        print(f"❌ Login failed: {r.text}")
        return None

def test_products():
    print("\n🔍 Testing products endpoint...")
    r = requests.get(f"{BASE_URL}/api/products/")
    products = r.json()
    print(f"✅ Found {len(products)} products")
    if products:
        print(f"   Sample: {products[0]['name']} - ₹{products[0]['base_price']}")
    return products

def test_cart(token):
    print("\n🔍 Testing cart operations...")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get cart
    r = requests.get(f"{BASE_URL}/api/cart/", headers=headers)
    print(f"✅ Cart retrieved: {r.json()['id']}")
    
    # Add item
    r = requests.post(
        f"{BASE_URL}/api/cart/items",
        headers=headers,
        json={"product_id": 1, "quantity": 2}
    )
    if r.status_code == 200:
        cart = r.json()
        print(f"✅ Item added. Cart total: ₹{cart['total_amount']}")
        return cart
    else:
        print(f"❌ Failed to add item: {r.text}")
        return None

def test_negotiation(token, cart_id):
    print("\n🔍 Testing negotiation...")
    headers = {"Authorization": f"Bearer {token}"}
    
    data = {
        "message": "Can I get a discount?",
        "cart_id": cart_id
    }
    
    r = requests.post(
        f"{BASE_URL}/api/chatbot/message",
        headers=headers,
        json=data
    )
    
    if r.status_code == 200:
        response = r.json()
        print(f"✅ Bot response: {response['message']}")
        if response.get('offer'):
            offer = response['offer']
            print(f"   💰 Discount: {offer['discount_percent']}%")
            print(f"   💵 Final price: ₹{offer['final_amount']}")
        return response
    else:
        print(f"❌ Negotiation failed: {r.text}")
        return None

def main():
    print("=" * 60)
    print("🤖 AI Price Negotiator - API Test Suite")
    print("=" * 60)
    
    try:
        # Test 1: Health
        if not test_health():
            print("\n❌ Backend not running! Start it first:")
            print("   cd backend && python -m uvicorn app.main:app --reload")
            return
        
        # Test 2: Products
        products = test_products()
        if not products:
            print("⚠️  No products found. They should be auto-seeded.")
        
        # Test 3: Register/Login
        token = test_register()
        if not token:
            print("\n❌ Authentication failed!")
            return
        
        # Test 4: Cart
        cart = test_cart(token)
        if not cart:
            print("\n❌ Cart operations failed!")
            return
        
        # Test 5: Negotiation
        negotiation = test_negotiation(token, cart['id'])
        
        print("\n" + "=" * 60)
        if negotiation:
            print("✅ ALL TESTS PASSED! 🎉")
            print("\n🚀 Your API is working perfectly!")
            print(f"   Frontend: http://localhost:5173")
            print(f"   API Docs: http://localhost:8000/docs")
        else:
            print("⚠️  Some tests failed. Check the output above.")
        print("=" * 60)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Cannot connect to backend!")
        print("   Make sure it's running on http://localhost:8000")
        print("   Start it: cd backend && python -m uvicorn app.main:app --reload")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()
