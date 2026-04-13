# 📡 API Documentation

Base URL: `http://localhost:8000`

## 🔐 Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 👤 Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepass123",
  "full_name": "John Doe",
  "phone": "+1234567890"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "full_name": "John Doe",
    "user_type": "new",
    "is_admin": false,
    "total_purchases": 0,
    "total_spent": 0.0,
    "loyalty_points": 0,
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response:** Same as register

---

## 🛍️ Product Endpoints

### List Products
```http
GET /api/products/?category=Electronics&search=headphone&min_price=1000&max_price=5000&skip=0&limit=20
```

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search in product name
- `min_price` (optional): Minimum price filter
- `max_price` (optional): Maximum price filter
- `skip` (optional): Pagination offset (default: 0)
- `limit` (optional): Items per page (default: 20)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Wireless Noise-Cancelling Headphones",
    "description": "Premium audio experience...",
    "category": "Electronics",
    "base_price": 4999.0,
    "max_discount_percent": 25.0,
    "stock": 50,
    "image_url": "https://...",
    "images": ["url1", "url2"],
    "rating": 4.5,
    "reviews_count": 128,
    "is_active": true,
    "is_negotiable": true,
    "tags": ["audio", "wireless"],
    "specifications": {},
    "created_at": "2024-01-01T00:00:00"
  }
]
```

### Get Product Details
```http
GET /api/products/{product_id}
```

**Response:** `200 OK` - Single product object

### Create Product (Admin Only)
```http
POST /api/products/
```

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "category": "Electronics",
  "base_price": 2999.0,
  "min_price": 2500.0,
  "max_discount_percent": 20.0,
  "stock": 100,
  "image_url": "https://...",
  "is_negotiable": true,
  "tags": ["tag1", "tag2"]
}
```

**Response:** `200 OK` - Created product object

### List Categories
```http
GET /api/products/categories/list
```

**Response:** `200 OK`
```json
["Electronics", "Fashion", "Sports", "Bags"]
```

---

## 🛒 Cart Endpoints

### Get User Cart
```http
GET /api/cart/
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "session_id": null,
  "total_amount": 9998.0,
  "discount_applied": 0.0,
  "final_amount": 9998.0,
  "is_active": true,
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "quantity": 2,
      "original_price": 4999.0,
      "negotiated_price": null,
      "discount_percent": 0.0
    }
  ],
  "created_at": "2024-01-01T00:00:00"
}
```

### Add Item to Cart
```http
POST /api/cart/items
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Response:** `200 OK` - Updated cart object

### Remove Item from Cart
```http
DELETE /api/cart/items/{item_id}
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK` - Updated cart object

### Clear Cart
```http
DELETE /api/cart/clear
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK` - Empty cart object

---

## 💬 Chatbot Endpoints

### WebSocket Connection
```
WS /api/chatbot/ws/{user_id}
```

**Send Message:**
```json
{
  "message": "Can I get a discount?",
  "cart_id": 1
}
```

**Receive Response:**
```json
{
  "message": "👋 Welcome! I can offer you 8% discount right away! Total: ₹9198.16",
  "offer": {
    "discount_percent": 8.0,
    "discount_amount": 799.84,
    "original_amount": 9998.0,
    "final_amount": 9198.16,
    "savings": 799.84,
    "is_time_limited": false,
    "expires_in_seconds": null
  },
  "negotiation_id": 1,
  "can_negotiate": true,
  "timestamp": "2024-01-01T00:00:00"
}
```

### Send Message (REST)
```http
POST /api/chatbot/message
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "message": "Can I get a discount?",
  "cart_id": 1
}
```

**Response:** `200 OK` - Same as WebSocket response

### Accept Offer
```http
POST /api/chatbot/accept-offer?negotiation_id=1
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "message": "🎉 Great! Your discount has been applied!",
  "success": true,
  "discount_applied": 8.0,
  "final_amount": 9198.16
}
```

### Get Negotiation History
```http
GET /api/chatbot/history/{cart_id}
```

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "messages": [
    {
      "user": "Can I get a discount?",
      "bot": "👋 Welcome! I can offer you 8% discount...",
      "timestamp": "2024-01-01T00:00:00",
      "offer": {...}
    }
  ],
  "status": "accepted",
  "discount_offered": 8.0,
  "final_amount": 9198.16
}
```

---

## 📊 Analytics Endpoints (Admin Only)

### Get Dashboard Stats
```http
GET /api/analytics/dashboard
```

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`
```json
{
  "total_negotiations": 150,
  "accepted_negotiations": 98,
  "conversion_rate": 65.3,
  "total_users": 45,
  "total_products": 8,
  "avg_discount_percent": 12.5,
  "total_savings_given": 45678.90
}
```

### Get Negotiations Log
```http
GET /api/analytics/negotiations?skip=0&limit=50
```

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "status": "accepted",
    "original_amount": 9998.0,
    "final_amount": 9198.16,
    "discount_offered": 8.0,
    "rounds": 1,
    "created_at": "2024-01-01T00:00:00"
  }
]
```

---

## 🔍 Health & Info Endpoints

### Health Check
```http
GET /health
```

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Root
```http
GET /
```

**Response:** `200 OK`
```json
{
  "message": "AI Price Negotiator API",
  "status": "active"
}
```

---

## 📝 Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden
```json
{
  "detail": "Admin access required"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Products
```bash
curl http://localhost:8000/api/products/
```

### Add to Cart
```bash
curl -X POST http://localhost:8000/api/cart/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product_id":1,"quantity":2}'
```

### Negotiate
```bash
curl -X POST http://localhost:8000/api/chatbot/message \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"Can I get a discount?","cart_id":1}'
```

---

## 📚 Interactive Documentation

Visit `http://localhost:8000/docs` for interactive Swagger UI documentation where you can test all endpoints directly in your browser!

---

## 🔗 Rate Limits

Currently no rate limits are enforced. In production, consider:
- 100 requests/minute for authenticated users
- 20 requests/minute for unauthenticated users
- 1000 requests/hour for admin endpoints

---

## 🌐 CORS

Allowed origins (configurable in `.env`):
- `http://localhost:5173`
- `http://localhost:3000`

Add your production domain before deploying!
