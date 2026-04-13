# AI-Based Price Negotiator Chatbot for E-Commerce

A full-stack e-commerce platform with an intelligent AI chatbot that negotiates product prices with customers in real-time, reducing cart abandonment and increasing sales through personalized, dynamic discounts.

## 🚀 Features

- **AI-Powered Negotiation**: Smart chatbot negotiates prices based on customer profile, cart value, and behavior
- **Dynamic Discounts**: Personalized discounts up to 25% based on multiple factors
- **Real-time Chat**: WebSocket-based chat for instant negotiation
- **Customer Analysis**: Analyzes cart abandonment risk, purchase history, and loyalty
- **Admin Dashboard**: Analytics, negotiation logs, and performance metrics
- **Responsive Design**: Mobile-first UI with smooth animations

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database (easily switchable to PostgreSQL)
- **WebSockets** - Real-time chat communication
- **Pydantic** - Data validation
- **JWT** - Authentication

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API client
- **React Router** - Navigation
- **Recharts** - Analytics charts
- **React Hot Toast** - Notifications

## 📦 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend
python -m pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

## 🎯 Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`

## 👤 Demo Accounts

### Admin Account
- **Email**: admin@negotiator.com
- **Password**: admin123

### Test User
Create a new account via the registration page.

## 🎨 Key Features Explained

### 1. AI Negotiation Engine
The negotiation engine considers:
- **Cart Value**: Higher cart values get better base discounts
- **User Type**: Loyalty bonuses (NEW, RETURNING, LOYAL, VIP)
- **Cart Abandonment Risk**: Higher risk = better offers
- **Sentiment Analysis**: Negative sentiment triggers higher discounts
- **Negotiation Rounds**: Incremental improvements per round
- **Product Constraints**: Respects max discount limits per product

### 2. NLP Service
- **Intent Detection**: Identifies user intent (ask_discount, negotiate, price_too_high, etc.)
- **Sentiment Analysis**: Analyzes customer mood
- **Entity Extraction**: Extracts prices and percentages from messages

### 3. Customer Analysis
- **Profile Analysis**: Tracks purchase history, spending, loyalty
- **Risk Calculation**: Predicts cart abandonment probability
- **Churn Prediction**: Identifies at-risk customers

### 4. Real-time Chat
- WebSocket connection for instant messaging
- Typing indicators
- Offer cards with countdown timers
- Quick reply buttons

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Products
- `GET /api/products/` - List products (with filters)
- `GET /api/products/{id}` - Get product details
- `GET /api/products/categories/list` - List categories
- `POST /api/products/` - Create product (admin)

### Cart
- `GET /api/cart/` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `DELETE /api/cart/items/{id}` - Remove item
- `DELETE /api/cart/clear` - Clear cart

### Chatbot
- `WS /api/chatbot/ws/{user_id}` - WebSocket connection
- `POST /api/chatbot/message` - Send message (REST alternative)
- `POST /api/chatbot/accept-offer` - Accept negotiation offer
- `GET /api/chatbot/history/{cart_id}` - Get negotiation history

### Analytics (Admin)
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/negotiations` - Negotiation logs

## 🎯 Negotiation Flow

1. **User adds items to cart**
2. **Opens chat widget**
3. **Expresses interest in discount** ("Can I get a discount?")
4. **AI analyzes**:
   - User profile and history
   - Cart value and items
   - Abandonment risk
   - Message sentiment
5. **AI generates personalized offer**
6. **User can**:
   - Accept offer (discount applied to cart)
   - Negotiate further (up to 5 rounds)
   - Reject and leave
7. **Time-limited offers** for high-risk carts

## 🔧 Configuration

### Backend (.env)
```env
DATABASE_URL=sqlite:///./negotiator.db
SECRET_KEY=your-secret-key-here
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (vite.config.js)
```js
server: {
  port: 5173,
  proxy: {
    '/api': 'http://localhost:8000',
    '/ws': { target: 'ws://localhost:8000', ws: true }
  }
}
```

## 📈 Pricing Rules

Default negotiation rules (configurable in `backend/app/services/negotiation_engine.py`):

- **Base Discount**: 5-15% based on cart value tiers
- **Loyalty Bonus**: 0-10% based on user type
- **Risk Multiplier**: 1.0-2.0x based on abandonment risk
- **Sentiment Bonus**: Up to 3% for negative sentiment
- **Round Bonus**: 1.5% per negotiation round (max 7%)
- **Max Discount**: 25% (or product-specific limit)

## 🎨 UI Components

### Chat Widget
- Floating button with online indicator
- Expandable chat window
- Message bubbles (user/bot)
- Offer cards with pricing breakdown
- Quick reply buttons
- Typing indicators

### Product Cards
- Image with hover effects
- Negotiable badge
- Discount hint
- Rating display
- Add to cart button

### Cart Page
- Item list with quantities
- Price breakdown
- Discount display
- Negotiation prompt

### Admin Dashboard
- Stats cards
- Pie charts
- Negotiation logs table
- Real-time metrics

## 🚀 Deployment

### Backend (Production)
```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend (Production)
```bash
npm run build
# Serve the dist/ folder with nginx or any static host
```

## 📝 Future Enhancements

- [ ] Voice negotiation
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Machine learning for discount optimization
- [ ] A/B testing for negotiation strategies
- [ ] Social proof integration
- [ ] Gamification (badges, leaderboards)
- [ ] Email/SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Product recommendations
- [ ] Group buying discounts

## 🤝 Contributing

This is a demo project. Feel free to fork and customize!

## 📄 License

MIT License - feel free to use for learning and commercial projects.

## 🎉 Demo Data

The app seeds 8 demo products on first run:
- Electronics (headphones, smartwatch, keyboard, speaker)
- Fashion (wallet)
- Sports (shoes, water bottle)
- Bags (laptop backpack)

All products are negotiable with varying discount limits.

---

**Built with ❤️ using FastAPI + React**
