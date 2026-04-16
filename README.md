# 🤖 AI-Based Price Negotiator Chatbot for E-Commerce

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)

A cutting-edge full-stack e-commerce platform featuring an intelligent AI chatbot that negotiates prices in real-time, providing personalized discounts and enhancing customer engagement.

![AI Price Negotiator](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

---

## 🌟 Key Features

### 🎯 AI-Powered Negotiation
- **Smart Price Negotiation**: AI chatbot analyzes cart value, user behavior, and product margins to offer dynamic discounts (5-25%)
- **Intent Detection**: Recognizes 7 types of user intents (greeting, price inquiry, negotiation, acceptance, rejection, product query, general)
- **Sentiment Analysis**: Adjusts negotiation strategy based on customer sentiment
- **Multi-Round Negotiation**: Supports iterative negotiation with intelligent counter-offers
- **Time-Limited Offers**: Creates urgency with expiring deals

### 🛒 E-Commerce Core
- **Product Catalog**: Browse 8+ demo products across multiple categories
- **Smart Search & Filters**: Search by name, filter by category, price range
- **Shopping Cart**: Real-time cart management with negotiated pricing
- **User Authentication**: Secure JWT-based auth with bcrypt password hashing
- **Admin Dashboard**: Comprehensive analytics and negotiation tracking

### 🎨 Modern UI/UX
- **Dark/Light Theme**: Seamless theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for delightful interactions
- **Real-Time Chat**: WebSocket-powered chatbot with typing indicators
- **Beautiful Gradients**: Modern purple-indigo gradient design system

### 📊 Analytics & Insights
- **Negotiation Metrics**: Track conversion rates, average discounts, total savings
- **User Analytics**: Monitor user behavior and engagement
- **Product Performance**: Analyze which products get negotiated most
- **Visual Dashboards**: Charts and graphs powered by Recharts

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

### 🎬 One-Click Setup (Windows)

1. **Clone the repository**
```bash
git clone https://github.com/Inamulhassan-dev/AI-BASED-PRICE-NEGOTIATOR-CHATBOT-FOR-E-COMMERCE.git
cd AI-BASED-PRICE-NEGOTIATOR-CHATBOT-FOR-E-COMMERCE
```

2. **Run automated setup**
```bash
SETUP.bat
```
This will automatically:
- Check for Python and Node.js
- Create virtual environment
- Install all dependencies (35+ packages)
- Initialize database with demo data
- Verify installation

3. **Start the project**
```bash
START-PROJECT.bat
```
This will:
- Start backend server (port 8000)
- Start frontend server (port 5173)
- Open browser automatically

4. **Access the application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### 🔐 Demo Credentials
```
Email: admin@negotiator.com
Password: admin123
```

---

## 🛠️ Manual Setup

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env      # configure SECRET_KEY and other settings
python init_demo_data.py
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
AI-BASED-PRICE-NEGOTIATOR/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── api/               # API Routes
│   │   │   ├── auth.py        # Authentication endpoints
│   │   │   ├── products.py    # Product CRUD
│   │   │   ├── cart.py        # Cart management
│   │   │   ├── chatbot.py     # AI negotiation logic
│   │   │   └── analytics.py   # Admin analytics
│   │   ├── core/              # Core configurations
│   │   │   ├── config.py      # App settings
│   │   │   ├── database.py    # SQLAlchemy setup
│   │   │   └── security.py    # JWT & bcrypt
│   │   ├── models/            # Database models
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   ├── cart.py
│   │   │   └── negotiation.py
│   │   ├── schemas/           # Pydantic schemas
│   │   └── services/          # Business logic
│   │       ├── nlp_service.py          # Intent & sentiment
│   │       ├── negotiation_engine.py   # Pricing logic
│   │       └── customer_analysis.py    # User profiling
│   ├── requirements.txt
│   └── init_demo_data.py
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── chatbot/       # Chat components
│   │   │   ├── common/        # Header, ThemeToggle
│   │   │   └── products/      # Product cards
│   │   ├── context/           # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/             # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── services/          # API client
│   │   └── styles/            # Global CSS
│   ├── package.json
│   └── tailwind.config.js
│
├── docs/                       # Documentation
├── SETUP.bat                   # Automated setup
├── START-PROJECT.bat           # Start servers
├── STOP-PROJECT.bat            # Stop servers
└── README.md
```

---

## 🧠 AI Negotiation Engine

### How It Works

1. **Intent Detection**
   - Analyzes user messages to understand intent
   - Supports: greeting, price_inquiry, negotiation_request, acceptance, rejection, product_query, general

2. **Sentiment Analysis**
   - Detects positive, negative, or neutral sentiment
   - Adjusts discount offers based on customer mood

3. **Dynamic Pricing**
   - Base discount: 5-10%
   - Cart value bonus: +5% for orders >₹5000
   - Loyalty bonus: +3% for returning customers
   - Sentiment bonus: +2% for positive sentiment
   - Maximum discount: 25%

4. **Negotiation Strategy**
   - Round 1: Conservative offer (5-10%)
   - Round 2: Moderate increase (+3-5%)
   - Round 3+: Final best offer (up to 25%)

---

## 🎨 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **bcrypt** - Password hashing
- **JWT** - Token-based authentication
- **SQLite** - Lightweight database

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Recharts** - Data visualization

---

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - Create new account
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Products
- `GET /products/` - List all products (with filters)
- `GET /products/{id}` - Get product details
- `GET /products/categories/list` - Get all categories

### Cart
- `GET /cart/` - Get user's cart
- `POST /cart/items` - Add item to cart
- `DELETE /cart/items/{id}` - Remove item

### Chatbot
- `POST /chatbot/message` - Send message to AI
- `POST /chatbot/accept-offer` - Accept negotiated price

### Analytics (Admin)
- `GET /analytics/dashboard` - Get dashboard stats
- `GET /analytics/negotiations` - List negotiations

Full API documentation: http://localhost:8000/docs

---

## 🎯 Use Cases

1. **E-Commerce Stores**: Reduce cart abandonment with personalized discounts
2. **Retail Platforms**: Automate price negotiation at scale
3. **Marketplace Apps**: Enhance buyer-seller interactions
4. **Customer Engagement**: Increase conversion rates with AI-driven deals
5. **Price Optimization**: Test different pricing strategies

---

## 🔧 Configuration

All backend settings are read from environment variables (or a `.env` file).
An example file is provided — copy it and customise:

```bash
cp backend/.env.example backend/.env
# then open backend/.env and set at least SECRET_KEY
```

Key variables (see `backend/.env.example` for the full list):

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | `change-me-in-production` | **Change before deploying!** JWT signing key |
| `DATABASE_URL` | `sqlite:///./negotiator.db` | SQLAlchemy DB URL |
| `ALLOWED_ORIGINS` | `http://localhost:5173,...` | Comma-separated CORS origins |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | JWT lifetime |

For **Docker / docker-compose**, copy the root-level example instead:

```bash
cp .env.example .env
```

### Frontend Configuration
The frontend talks to the backend through Vite's dev-server proxy (`/api → http://localhost:8000`).
No code changes are needed for local development.
For a custom backend URL, set `VITE_API_URL` in `frontend/.env` and update `frontend/vite.config.js`.

---

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

This will start:
- Backend on port 8000
- Frontend on port 5173
- PostgreSQL database (production)

---

## 📝 Batch Files Guide

- **SETUP.bat** - First-time setup with dependency installation
- **START-PROJECT.bat** - Start both servers with health checks
- **STOP-PROJECT.bat** - Stop all servers and free ports
- **CLEANUP-FOR-GIT.bat** - Clean temporary files before commit

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Inamul Hassan**
- GitHub: [@Inamulhassan-dev](https://github.com/Inamulhassan-dev)
- Email: inamulhassan.dev@gmail.com

---

## 🙏 Acknowledgments

- FastAPI for the amazing backend framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first approach
- All open-source contributors

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Documentation](docs/)
2. Open an [Issue](https://github.com/Inamulhassan-dev/AI-BASED-PRICE-NEGOTIATOR-CHATBOT-FOR-E-COMMERCE/issues)
3. Contact: inamulhassan.dev@gmail.com

---

## ⭐ Star This Repository

If you find this project useful, please give it a star! It helps others discover the project.

---

**Made with ❤️ and AI**
