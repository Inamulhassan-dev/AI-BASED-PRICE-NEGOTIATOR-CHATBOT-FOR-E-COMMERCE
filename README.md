# 🤖 AI Price Negotiator - E-Commerce Platform

An intelligent e-commerce platform with AI-powered price negotiation chatbot that helps customers get the best deals through real-time conversation.

## ✨ Features

- 🛍️ **Full E-Commerce** - Product catalog, shopping cart, checkout
- 🤖 **AI Negotiation** - Smart chatbot negotiates prices in real-time
- 🎨 **Dark/Light Theme** - Beautiful UI with theme persistence
- 👤 **User Authentication** - Secure JWT-based auth system
- 📊 **Admin Dashboard** - Analytics and negotiation tracking
- 💬 **Real-time Chat** - WebSocket-powered instant messaging
- 📱 **Responsive Design** - Works on all devices

## 🚀 Quick Start

### For New Users (First Time Setup)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-price-negotiator
   ```

2. **Run Setup** (One-time only)
   ```bash
   SETUP.bat
   ```
   This will automatically:
   - Check Python and Node.js installation
   - Install all backend dependencies
   - Install all frontend dependencies
   - Initialize database with demo products
   - Verify everything is ready

3. **Start the Project**
   ```bash
   START-PROJECT.bat
   ```
   - Starts backend server (http://localhost:8000)
   - Starts frontend server (http://localhost:5173)
   - Opens browser automatically

4. **Stop the Project**
   ```bash
   STOP-PROJECT.bat
   ```
   - Stops all servers
   - Cleans temporary files
   - Frees ports

## 📋 Requirements

- **Python 3.10+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Windows OS** - Batch files are for Windows

## 🎯 Demo Credentials

**Admin Account:**
- Email: `admin@negotiator.com`
- Password: `admin123`

## 📁 Project Structure

```
ai-price-negotiator/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/         # API endpoints
│   │   ├── core/        # Config, database, security
│   │   ├── models/      # SQLAlchemy models
│   │   ├── schemas/     # Pydantic schemas
│   │   └── services/    # Business logic
│   ├── venv/            # Python virtual environment
│   └── requirements.txt # Python dependencies
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React context (Auth, Cart, Theme)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── styles/      # Global styles
│   ├── node_modules/    # Node dependencies
│   └── package.json     # Node dependencies
│
├── docs/                # Documentation
├── logs/                # Application logs
│
├── SETUP.bat           # One-time setup
├── START-PROJECT.bat   # Start servers
└── STOP-PROJECT.bat    # Stop servers
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database
- **SQLite** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **WebSocket** - Real-time communication

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client

## 📖 Documentation

All documentation is in the `docs/` folder:

- `API.md` - API endpoints documentation
- `FEATURES.md` - Detailed features list
- `DEPLOYMENT.md` - Deployment guide
- `THEME_IMPLEMENTATION.md` - Theme system docs
- And more...

## 🎨 Features in Detail

### AI Price Negotiation
- Sentiment analysis of customer messages
- Dynamic discount calculation based on:
  - Cart value
  - Customer loyalty
  - Negotiation rounds
  - Product margins
- Time-limited offers
- Real-time chat interface

### E-Commerce
- Product browsing with filters
- Shopping cart management
- User authentication
- Order summary
- Admin analytics dashboard

### Theme System
- Dark and light modes
- Smooth transitions
- Persists in localStorage
- System preference detection

## 🔧 Development

### Backend Development
```bash
cd backend
venv\Scripts\activate
python -m uvicorn app.main:app --reload
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database Reset
```bash
cd backend
venv\Scripts\activate
python init_demo_data.py
```

## 📊 Demo Products

The setup includes 8 demo products:
1. Premium Wireless Headphones - ₹4,999
2. Smart Fitness Watch - ₹3,499
3. Leather Laptop Bag - ₹2,999
4. Portable Bluetooth Speaker - ₹1,999
5. Ergonomic Office Chair - ₹8,999
6. Stainless Steel Water Bottle - ₹799
7. Wireless Gaming Mouse - ₹2,499
8. Cotton T-Shirt Pack - ₹1,499

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Port Already in Use
Run `STOP-PROJECT.bat` to free ports 5173 and 8000

### Setup Fails
- Ensure Python 3.10+ is installed
- Ensure Node.js 18+ is installed
- Check `logs/setup.log` for details

### Database Issues
Delete `backend/negotiator.db` and run setup again

## 📞 Support

For issues and questions, check the `docs/` folder or create an issue on GitHub.

---

**Made with ❤️ using FastAPI, React, and AI**
