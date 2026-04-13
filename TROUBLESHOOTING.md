# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 🚫 START-PROJECT.bat Not Opening

#### Problem: Double-clicking START-PROJECT.bat does nothing or closes immediately

**Solutions:**

1. **Run SETUP.bat first**
   ```
   Double-click SETUP.bat
   Wait for it to complete
   Then try START-PROJECT.bat again
   ```

2. **Check if Python/Node.js are installed**
   - Open Command Prompt (cmd)
   - Type: `python --version`
   - Type: `node --version`
   - If either command fails, install the missing software

3. **Run as Administrator**
   - Right-click START-PROJECT.bat
   - Select "Run as administrator"

4. **Check the logs**
   - Look in the `logs/` folder
   - Open the most recent `start_*.log` file
   - Check for error messages

---

### ⚠️ "Backend not set up" Error

#### Problem: START-PROJECT.bat says "Backend not set up"

**Solution:**
```
1. Double-click SETUP.bat
2. Wait for it to complete (may take 5-10 minutes)
3. Look for "SETUP COMPLETED SUCCESSFULLY!" message
4. Then run START-PROJECT.bat
```

---

### ⚠️ "Frontend not set up" Error

#### Problem: START-PROJECT.bat says "Frontend not set up"

**Solution:**
```
1. Make sure Node.js is installed
2. Run SETUP.bat again
3. Wait for npm install to complete
4. Then run START-PROJECT.bat
```

---

### 🔴 Port Already in Use

#### Problem: "Port 5173 or 8000 is already in use"

**Solutions:**

1. **Run STOP-PROJECT.bat**
   ```
   Double-click STOP-PROJECT.bat
   Wait for it to complete
   Then run START-PROJECT.bat again
   ```

2. **Manual port cleanup**
   ```cmd
   # Open Command Prompt as Administrator
   # Kill process on port 5173
   netstat -ano | findstr :5173
   taskkill /F /PID [PID_NUMBER]
   
   # Kill process on port 8000
   netstat -ano | findstr :8000
   taskkill /F /PID [PID_NUMBER]
   ```

3. **Restart your computer**
   - Sometimes processes don't release ports properly
   - A restart will clear everything

---

### 🐍 Python Not Found

#### Problem: "Python is not installed or not in PATH"

**Solution:**

1. **Download Python**
   - Go to: https://www.python.org/downloads/
   - Download Python 3.11 or higher

2. **Install Python**
   - Run the installer
   - ⚠️ **IMPORTANT**: Check "Add Python to PATH"
   - Click "Install Now"

3. **Verify installation**
   ```cmd
   python --version
   ```

4. **If still not working**
   - Restart your computer
   - Try again

---

### 📦 Node.js Not Found

#### Problem: "Node.js is not installed or not in PATH"

**Solution:**

1. **Download Node.js**
   - Go to: https://nodejs.org/
   - Download LTS version (18 or higher)

2. **Install Node.js**
   - Run the installer
   - Use default settings
   - It will automatically add to PATH

3. **Verify installation**
   ```cmd
   node --version
   npm --version
   ```

4. **If still not working**
   - Restart your computer
   - Try again

---

### 💾 Database Errors

#### Problem: Database initialization fails or login doesn't work

**Solution:**

1. **Delete old database**
   ```
   Go to: backend/
   Delete: negotiator.db
   ```

2. **Reinitialize database**
   ```
   Run SETUP.bat again
   Or manually:
   cd backend
   venv\Scripts\activate
   python init_demo_data.py
   ```

3. **Use correct credentials**
   ```
   Email: admin@negotiator.com
   Password: admin123
   ```

---

### 🌐 Browser Doesn't Open

#### Problem: START-PROJECT.bat runs but browser doesn't open

**Solution:**

1. **Manually open browser**
   - Open your browser
   - Go to: http://localhost:5173

2. **Check if servers are running**
   - Look for two new Command Prompt windows
   - One should say "Backend" (port 8000)
   - One should say "Frontend" (port 5173)

3. **If windows closed immediately**
   - Check logs/ folder for errors
   - Run SETUP.bat again

---

### 🔄 Servers Start But Page Won't Load

#### Problem: Servers start but http://localhost:5173 shows error

**Solutions:**

1. **Wait longer**
   - Frontend can take 10-15 seconds to start
   - Refresh the page after waiting

2. **Check backend health**
   - Open: http://localhost:8000/health
   - Should show: {"status":"healthy"}

3. **Check for errors**
   - Look at the Backend window for errors
   - Look at the Frontend window for errors

4. **Restart everything**
   ```
   1. Run STOP-PROJECT.bat
   2. Wait 10 seconds
   3. Run START-PROJECT.bat
   ```

---

### 📝 Login Not Working

#### Problem: Can't login with admin credentials

**Solutions:**

1. **Use correct credentials**
   ```
   Email: admin@negotiator.com
   Password: admin123
   ```
   ⚠️ Case-sensitive!

2. **Reset database**
   ```
   1. Run STOP-PROJECT.bat
   2. Delete backend/negotiator.db
   3. Run SETUP.bat
   4. Run START-PROJECT.bat
   ```

3. **Check backend is running**
   - Open: http://localhost:8000/docs
   - Should show API documentation

---

### 🎨 Dark Mode Not Working

#### Problem: Theme toggle doesn't work

**Solutions:**

1. **Clear browser cache**
   - Press Ctrl+Shift+Delete
   - Clear cache and cookies
   - Refresh page

2. **Check localStorage**
   - Press F12 (Developer Tools)
   - Go to Application → Local Storage
   - Look for 'theme' key

3. **Try different browser**
   - Chrome, Firefox, or Edge

---

### 🔥 Everything Fails

#### Problem: Nothing works, multiple errors

**Nuclear Option - Complete Reset:**

1. **Stop everything**
   ```
   Run STOP-PROJECT.bat
   Close all Command Prompt windows
   ```

2. **Delete generated files**
   ```
   Delete: backend/venv/ folder
   Delete: backend/negotiator.db
   Delete: frontend/node_modules/ folder
   Delete: logs/ folder
   ```

3. **Fresh setup**
   ```
   Run SETUP.bat
   Wait for complete success
   Run START-PROJECT.bat
   ```

4. **Still not working?**
   - Restart your computer
   - Check antivirus isn't blocking
   - Try running as Administrator

---

## 📊 How to Check Logs

### View Setup Logs
```
1. Go to logs/ folder
2. Open setup_*.log
3. Look for [ERROR] or [WARNING] messages
```

### View Start Logs
```
1. Go to logs/ folder
2. Open start_*.log
3. Check what happened during startup
```

### View Backend Logs
```
Look at the "Backend" Command Prompt window
Errors will be shown in red
```

### View Frontend Logs
```
Look at the "Frontend" Command Prompt window
Errors will be shown in the console
```

---

## 🆘 Still Need Help?

### Check Documentation
- README.md - Main documentation
- docs/SETUP.md - Detailed setup guide
- docs/API.md - API documentation

### Check GitHub Issues
- https://github.com/Inamulhassan-dev/AI-BASED-PRICE-NEGOTIATOR-CHATBOT-FOR-E-COMMERCE/issues
- Search for similar problems
- Create a new issue if needed

### Contact Support
- Email: inamulhassan.dev@gmail.com
- Include:
  - Your error message
  - Log files from logs/ folder
  - Python version (python --version)
  - Node.js version (node --version)
  - Windows version

---

## ✅ Quick Checklist

Before asking for help, verify:

- [ ] Python 3.10+ is installed
- [ ] Node.js 18+ is installed
- [ ] SETUP.bat completed successfully
- [ ] No other apps using ports 5173 or 8000
- [ ] Antivirus isn't blocking the app
- [ ] You're running as Administrator (if needed)
- [ ] You've checked the logs/ folder
- [ ] You've tried restarting your computer

---

## 🎯 Prevention Tips

### Best Practices

1. **Always run SETUP.bat first**
   - Before first use
   - After pulling updates from Git

2. **Use STOP-PROJECT.bat**
   - Before closing your computer
   - Before running SETUP.bat again

3. **Keep software updated**
   - Update Python regularly
   - Update Node.js regularly

4. **Don't delete important files**
   - Keep backend/venv/ folder
   - Keep frontend/node_modules/ folder
   - Keep backend/negotiator.db file

5. **Check logs regularly**
   - Look in logs/ folder
   - Helps identify issues early

---

**Remember**: Most issues are solved by running SETUP.bat again! 🔄
