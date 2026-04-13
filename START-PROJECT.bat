@echo off
SETLOCAL EnableDelayedExpansion
COLOR 0B
TITLE AI Price Negotiator - Starting...

:: ============================================
:: START-PROJECT.BAT - Start All Servers
:: ============================================

:: Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

echo.
echo ========================================
echo   AI PRICE NEGOTIATOR - STARTING
echo ========================================
echo.

:: Create logs directory
if not exist "logs" mkdir logs
set LOGFILE=logs\start.log

echo [%date% %time%] Starting project... > "%LOGFILE%"
echo Starting project... Please wait...
echo.

:: ============================================
:: Check if setup was run
:: ============================================
echo [1/5] Checking setup...

if not exist "backend" (
    COLOR 0C
    echo.
    echo [ERROR] Backend folder not found!
    echo Make sure you are in the correct directory.
    echo Current directory: %CD%
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

if not exist "frontend" (
    COLOR 0C
    echo.
    echo [ERROR] Frontend folder not found!
    echo Make sure you are in the correct directory.
    echo Current directory: %CD%
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

if not exist "backend\venv" (
    COLOR 0C
    echo.
    echo [ERROR] Backend virtual environment not found!
    echo.
    echo Please run SETUP.bat first to install dependencies.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

if not exist "frontend\node_modules" (
    COLOR 0C
    echo.
    echo [ERROR] Frontend node_modules not found!
    echo.
    echo Please run SETUP.bat first to install dependencies.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo [OK] Setup verified
echo.

:: ============================================
:: Kill any existing processes on ports
:: ============================================
echo [2/5] Checking and clearing ports...

:: Kill processes on port 5173 (Frontend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING 2^>nul') do (
    echo    Killing process on port 5173 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

:: Kill processes on port 8000 (Backend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000 ^| findstr LISTENING 2^>nul') do (
    echo    Killing process on port 8000 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo [OK] Ports cleared
echo.

:: ============================================
:: Start Backend Server
:: ============================================
echo [3/5] Starting backend server...

:: Check if Python is available
python --version >nul 2>&1
if !errorlevel! neq 0 (
    COLOR 0C
    echo.
    echo [ERROR] Python is not installed or not in PATH!
    echo.
    echo Please install Python 3.10+ from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

:: Start backend in a new window
start "AI Negotiator - Backend (Port 8000)" cmd /k "cd /d "%SCRIPT_DIR%backend" && venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --port 8000"

echo [OK] Backend starting on http://localhost:8000
echo    (A new window opened for the backend server)
echo.

:: Wait for backend to initialize
echo    Waiting for backend to initialize (5 seconds)...
timeout /t 5 /nobreak >nul

:: ============================================
:: Start Frontend Server
:: ============================================
echo [4/5] Starting frontend server...

:: Check if Node.js is available
node --version >nul 2>&1
if !errorlevel! neq 0 (
    COLOR 0C
    echo.
    echo [ERROR] Node.js is not installed or not in PATH!
    echo.
    echo Please install Node.js 18+ from: https://nodejs.org/
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

:: Start frontend in a new window
start "AI Negotiator - Frontend (Port 5173)" cmd /k "cd /d "%SCRIPT_DIR%frontend" && npm run dev"

echo [OK] Frontend starting on http://localhost:5173
echo    (A new window opened for the frontend server)
echo.

:: ============================================
:: Wait and Open Browser
:: ============================================
echo [5/5] Waiting for servers to fully start...
echo    This may take 10-15 seconds...
echo.

timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo   SERVERS ARE RUNNING!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Demo Login Credentials:
echo   Email:    admin@negotiator.com
echo   Password: admin123
echo.
echo ========================================
echo.
echo Opening browser...

:: Open browser
start http://localhost:5173

echo.
echo [%date% %time%] Project started successfully >> "%LOGFILE%"
echo.
echo ========================================
echo   IMPORTANT NOTES:
echo ========================================
echo.
echo - Two new windows opened (Backend and Frontend)
echo - Keep those windows OPEN while using the app
echo - To stop servers, run STOP-PROJECT.bat
echo - Or close the Backend and Frontend windows
echo.
echo ========================================
echo.
echo This window will close in 10 seconds...
echo Or press any key to close now...
timeout /t 10 >nul
