# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

### Backend
```bash
cd backend
python -m pip install fastapi uvicorn sqlalchemy pydantic pydantic-settings python-jose[cryptography] passlib[bcrypt] python-multipart websockets python-dotenv aiosqlite
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Start the Servers

### Option A: Using Batch Files (Windows)
Double-click these files:
1. `start-backend.bat` - Starts backend on http://localhost:8000
2. `start-frontend.bat` - Starts frontend on http://localhost:5173

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 3: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## Step 4: Login

### Admin Account (Pre-created)
- Email: `admin@negotiator.com`
- Password: `admin123`

### Create New User
Click "Sign Up" and create your account.

## 🎯 How to Use

1. **Browse Products** - Go to Shop page
2. **Add to Cart** - Click "Add" on any product
3. **Open Chat Widget** - Click the purple chat button (bottom right)
4. **Negotiate** - Type messages like:
   - "Can I get a discount?"
   - "This is too expensive"
   - "Best price?"
5. **Accept Offer** - Click "Accept This Offer" when satisfied
6. **Checkout** - Go to cart and see your discount applied!

## 🎨 Demo Products

The app includes 8 pre-loaded products:
- Wireless Headphones (₹4,999)
- Smart Fitness Watch (₹8,999)
- Gaming Keyboard (₹3,499)
- Leather Wallet (₹1,299)
- Bluetooth Speaker (₹2,999)
- Running Shoes (₹3,999)
- Water Bottle (₹899)
- Laptop Backpack (₹2,499)

All products are negotiable with AI!

## 🔧 Troubleshooting

### Backend won't start
- Make sure Python 3.10+ is installed: `python --version`
- Install dependencies again: `pip install -r requirements.txt`
- Check if port 8000 is free

### Frontend won't start
- Make sure Node.js 18+ is installed: `node --version`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is free

### Chat not working
- Ensure backend is running on port 8000
- Check browser console for errors
- Make sure you're logged in

### Database errors
- Delete `backend/negotiator.db` and restart backend
- Database will be recreated automatically

## 📱 Features to Try

1. **Negotiation Flow**
   - Add items worth ₹5000+ to cart
   - Chat: "Can I get a discount?"
   - See personalized offer based on cart value
   - Try negotiating: "Still too high"
   - Get improved offer!

2. **Admin Dashboard**
   - Login as admin
   - Go to `/admin`
   - View analytics, conversion rates, negotiations

3. **User Types**
   - New users get base discounts
   - Make purchases to become RETURNING → LOYAL → VIP
   - Higher tiers get better automatic discounts

4. **Time-Limited Offers**
   - High-value carts get countdown timers
   - Creates urgency to accept deals

## 🎓 Understanding the AI

The negotiation engine considers:
- **Cart Value**: ₹0-500 (5%), ₹500-2000 (8%), ₹2000-5000 (12%), ₹5000+ (15%)
- **User Loyalty**: NEW (0%), RETURNING (+2%), LOYAL (+5%), VIP (+10%)
- **Sentiment**: Negative messages get +3% bonus
- **Negotiation Rounds**: Each round adds +1.5% (max 5 rounds)
- **Cart Risk**: High abandonment risk = 1.5-2x multiplier
- **Product Limits**: Each product has max discount (20-30%)

**Example Calculation:**
- Cart: ₹6000 (15% base)
- User: LOYAL (+5%)
- Sentiment: Negative (+3%)
- Round 2: (+3%)
- Risk: High (×1.5)
- **Total: (15+5+3+3) × 1.5 = 39%** → Capped at product max (25%)

## 🚀 Next Steps

1. Customize negotiation rules in `backend/app/services/negotiation_engine.py`
2. Add more products via Admin panel or API
3. Modify UI colors in `frontend/tailwind.config.js`
4. Add new intents in `backend/app/services/nlp_service.py`
5. Deploy to production (see README.md)

---

**Need help?** Check the full README.md for detailed documentation.
