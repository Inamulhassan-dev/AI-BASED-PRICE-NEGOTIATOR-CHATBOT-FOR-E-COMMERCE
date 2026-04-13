# 🚀 Quick Start Guide

Get your AI Price Negotiator running in 3 simple steps!

## For New Users (First Time)

### Step 1: Clone the Project
```bash
git clone <your-repo-url>
cd ai-price-negotiator
```

### Step 2: Run Setup (One Time Only)
```bash
# Double-click this file:
SETUP.bat
```

**What it does:**
- Checks Python and Node.js
- Installs all dependencies
- Creates database with 8 demo products
- Creates admin user

**Time:** 5-10 minutes

### Step 3: Start the Project
```bash
# Double-click this file:
START-PROJECT.bat
```

**What it does:**
- Starts backend server
- Starts frontend server
- Opens browser automatically

**Time:** 5-10 seconds

## 🎉 That's It!

Your application is now running at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

## 🔑 Demo Login

**Admin Account:**
- Email: `admin@negotiator.com`
- Password: `admin123`

## 🛑 When You're Done

```bash
# Double-click this file:
STOP-PROJECT.bat
```

Stops all servers and cleans temporary files.

## 📁 Clean Project Structure

```
ai-price-negotiator/
├── backend/           # Python FastAPI backend
├── frontend/          # React frontend
├── docs/             # All documentation
├── logs/             # Application logs
├── SETUP.bat         # One-time setup
├── START-PROJECT.bat # Start servers
├── STOP-PROJECT.bat  # Stop servers
└── README.md         # Main documentation
```

## 🔄 Daily Workflow

```bash
1. START-PROJECT.bat  # Start working
2. [Do your work]
3. STOP-PROJECT.bat   # Stop when done
```

## ❓ Need Help?

- **Setup fails?** Check `logs/setup.log`
- **Port in use?** Run `STOP-PROJECT.bat` first
- **More details?** Read `docs/BATCH_FILES_GUIDE.md`

## 📚 Full Documentation

All docs are in the `docs/` folder:
- `BATCH_FILES_GUIDE.md` - Detailed batch file guide
- `API.md` - API documentation
- `FEATURES.md` - Feature list
- `DEPLOYMENT.md` - Deployment guide
- And more...

---

**That's all you need to know! Simple, right? 🎯**
