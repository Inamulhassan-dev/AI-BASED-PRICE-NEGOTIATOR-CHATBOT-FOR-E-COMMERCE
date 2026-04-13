# 📦 Batch Files Guide

Complete guide for the 3 automated batch files that manage your AI Price Negotiator project.

## 🎯 Overview

Three powerful batch files for complete project automation:

1. **SETUP.bat** - One-time setup (installs everything)
2. **START-PROJECT.bat** - Start all servers
3. **STOP-PROJECT.bat** - Stop servers and clean

## 📋 SETUP.bat - Complete Setup

### What It Does

Automatically sets up your entire project from scratch:

1. ✅ Checks Python installation (3.10+)
2. ✅ Checks Node.js installation (18+)
3. ✅ Creates Python virtual environment
4. ✅ Installs all Python packages (35+ packages)
5. ✅ Installs all Node.js packages (100+ packages)
6. ✅ Initializes SQLite database
7. ✅ Creates 8 demo products
8. ✅ Creates admin user
9. ✅ Verifies everything is ready

### When to Run

- **First time** cloning the project
- After **deleting** node_modules or venv
- When **dependencies** are updated
- To **reset** the project to fresh state

### How to Run

```bash
# Double-click the file, or run from command line:
SETUP.bat
```

### What You'll See

```
========================================
  AI PRICE NEGOTIATOR - SETUP
========================================

[STEP 1/6] Checking Python installation...
[OK] Python 3.14.0 found

[STEP 2/6] Checking Node.js installation...
[OK] Node.js v20.11.0 found

[STEP 3/6] Setting up backend...
Creating Python virtual environment...
[OK] Virtual environment created
Installing Python packages...
This may take 2-3 minutes...
[OK] Backend dependencies installed

[STEP 4/6] Setting up frontend...
Installing Node.js packages...
This may take 3-5 minutes...
[OK] Frontend dependencies installed

[STEP 5/6] Initializing database...
[OK] Database initialized with demo data

[STEP 6/6] Verifying installation...

========================================
  SETUP COMPLETED SUCCESSFULLY!
========================================

Your AI Price Negotiator is ready!

Next steps:
 1. Run START-PROJECT.bat to launch the application
 2. Open http://localhost:5173 in your browser
 3. Login with: admin@negotiator.com / admin123
```

### Time Required

- **First run**: 5-10 minutes (downloads all packages)
- **Subsequent runs**: 2-3 minutes (if packages cached)

### Troubleshooting

**Error: Python is not installed**
- Download from https://www.python.org/downloads/
- Install Python 3.10 or higher
- Check "Add Python to PATH" during installation

**Error: Node.js is not installed**
- Download from https://nodejs.org/
- Install Node.js 18 or higher
- Restart command prompt after installation

**Error: Failed to install packages**
- Check internet connection
- Check `logs/setup.log` for details
- Try running as Administrator

## 🚀 START-PROJECT.bat - Start Servers

### What It Does

Starts your complete application:

1. ✅ Checks if setup was run
2. ✅ Kills any processes on ports 5173 and 8000
3. ✅ Starts backend server (FastAPI)
4. ✅ Starts frontend server (Vite)
5. ✅ Opens browser automatically

### When to Run

- Every time you want to **use** the application
- After running **SETUP.bat**
- After running **STOP-PROJECT.bat**

### How to Run

```bash
# Double-click the file, or run from command line:
START-PROJECT.bat
```

### What You'll See

```
========================================
  AI PRICE NEGOTIATOR - STARTING
========================================

[1/4] Checking ports...
[OK] Ports cleared

[2/4] Starting backend server...
[OK] Backend starting on http://localhost:8000

[3/4] Starting frontend server...
[OK] Frontend starting on http://localhost:5173

[4/4] Waiting for servers to start...

========================================
  SERVERS ARE RUNNING!
========================================

Backend:  http://localhost:8000
Frontend: http://localhost:5173
API Docs: http://localhost:8000/docs

Demo Login:
  Email: admin@negotiator.com
  Password: admin123

========================================

Opening browser...

To stop the servers, run STOP-PROJECT.bat
```

### What Happens

- **Two command windows** open:
  - One for backend (black window with FastAPI logs)
  - One for frontend (black window with Vite logs)
- **Browser opens** automatically to http://localhost:5173
- **Servers run** until you close the windows or run STOP-PROJECT.bat

### Time Required

- **5-10 seconds** to start both servers

### Troubleshooting

**Error: Backend not set up**
- Run `SETUP.bat` first

**Error: Port already in use**
- Run `STOP-PROJECT.bat` first
- Or manually close the server windows

**Browser doesn't open**
- Manually open http://localhost:5173

## 🛑 STOP-PROJECT.bat - Stop & Clean

### What It Does

Stops everything and cleans up:

1. ✅ Stops all Node.js processes
2. ✅ Stops all Python processes
3. ✅ Frees ports 5173 and 8000
4. ✅ Cleans Python cache files
5. ✅ Cleans old log files
6. ✅ **Optional**: Remove node_modules and venv

### When to Run

- When you're **done** using the application
- Before **shutting down** your computer
- To **free up** system resources
- To **clean** temporary files

### How to Run

```bash
# Double-click the file, or run from command line:
STOP-PROJECT.bat
```

### What You'll See

```
========================================
  AI PRICE NEGOTIATOR - STOPPING
========================================

[1/5] Stopping Node.js processes...
[OK] Node.js processes stopped

[2/5] Stopping Python processes...
[OK] Python processes stopped

[3/5] Freeing ports 5173 and 8000...
[OK] Ports freed

[4/5] Cleaning temporary files...
[OK] Temporary files cleaned

[5/5] Do you want to clean build files?

Options:
  [1] No - Keep everything (recommended)
  [2] Yes - Clean node_modules and venv (saves space)

Enter choice (1 or 2): 1

[OK] Build files kept

========================================
  PROJECT STOPPED SUCCESSFULLY!
========================================

All servers have been stopped.
Temporary files have been cleaned.

To start again, run START-PROJECT.bat
```

### Clean Options

**Option 1: Keep everything (Recommended)**
- Stops servers
- Cleans cache only
- Quick restart next time

**Option 2: Clean build files**
- Removes `frontend/node_modules` (~500MB)
- Removes `backend/venv` (~200MB)
- Saves ~700MB disk space
- Requires running `SETUP.bat` again

### Time Required

- **2-3 seconds** (Option 1)
- **10-20 seconds** (Option 2)

### Troubleshooting

**Processes won't stop**
- Run as Administrator
- Manually close server windows
- Restart computer

## 📊 Logs

All batch files create detailed logs in `logs/` folder:

- `setup_YYYYMMDD_HHMMSS.log` - Setup logs
- `start_YYYYMMDD_HHMMSS.log` - Start logs
- `stop_YYYYMMDD_HHMMSS.log` - Stop logs

### View Logs

```bash
cd logs
type setup_*.log
```

## 🔄 Typical Workflow

### First Time Setup

```bash
1. Clone repository
2. Run SETUP.bat (one time)
3. Run START-PROJECT.bat
4. Use the application
5. Run STOP-PROJECT.bat when done
```

### Daily Use

```bash
1. Run START-PROJECT.bat
2. Use the application
3. Run STOP-PROJECT.bat when done
```

### After Updates

```bash
1. Run STOP-PROJECT.bat
2. Pull latest changes
3. Run SETUP.bat (if dependencies changed)
4. Run START-PROJECT.bat
```

## 🎯 Best Practices

### DO:
- ✅ Run SETUP.bat once after cloning
- ✅ Run START-PROJECT.bat every time you work
- ✅ Run STOP-PROJECT.bat when done
- ✅ Keep server windows open while working
- ✅ Check logs if something fails

### DON'T:
- ❌ Close server windows manually (use STOP-PROJECT.bat)
- ❌ Run multiple START-PROJECT.bat instances
- ❌ Delete venv or node_modules manually
- ❌ Edit batch files unless you know what you're doing

## 🆘 Common Issues

### "Python is not recognized"
**Solution**: Add Python to PATH
1. Find Python installation folder
2. Add to System Environment Variables
3. Restart command prompt

### "npm is not recognized"
**Solution**: Add Node.js to PATH
1. Reinstall Node.js
2. Check "Add to PATH" option
3. Restart command prompt

### "Port 5173 is already in use"
**Solution**: Run STOP-PROJECT.bat first

### "Module not found"
**Solution**: Run SETUP.bat again

### "Database locked"
**Solution**: 
1. Run STOP-PROJECT.bat
2. Delete `backend/negotiator.db`
3. Run SETUP.bat

## 📞 Support

If batch files fail:
1. Check `logs/` folder for error details
2. Run as Administrator
3. Check Python and Node.js versions
4. Ensure internet connection for setup

---

**These batch files make your life easier! Use them! 🚀**
