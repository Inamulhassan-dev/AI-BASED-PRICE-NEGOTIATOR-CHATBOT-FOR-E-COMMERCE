@echo off
SETLOCAL EnableDelayedExpansion
COLOR 0B
TITLE AI Price Negotiator - Starting...

:: ============================================
:: START-PROJECT.BAT - Start All Servers
:: ============================================

echo.
echo ========================================
echo   AI PRICE NEGOTIATOR - STARTING
echo ========================================
echo.

:: Create logs directory
if not exist "logs" mkdir logs
set LOGFILE=logs\start_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
set LOGFILE=%LOGFILE: =0%

echo [%date% %time%] Starting project... > "%LOGFILE%"

:: ============================================
:: Check if setup was run
:: ============================================
if not exist "backend\venv" (
    echo [ERROR] Backend not set up!
    echo Please run SETUP.bat first
    echo.
    pause
    exit /b 1
)

if not exist "frontend\node_modules" (
    echo [ERROR] Frontend not set up!
    echo Please run SETUP.bat first
    echo.
    pause
    exit /b 1
)

:: ============================================
:: Kill any existing processes on ports
:: ============================================
echo [1/4] Checking ports...
echo [%date% %time%] Checking ports... >> "%LOGFILE%"

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    echo Killing process on port 5173...
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do (
    echo Killing process on port 8000...
    taskkill /F /PID %%a >nul 2>&1
)

echo [OK] Ports cleared

:: ============================================
:: Start Backend Server
:: ============================================
echo [2/4] Starting backend server...
echo [%date% %time%] Starting backend... >> "%LOGFILE%"

cd backend
start "AI Negotiator - Backend" cmd /k "call venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --port 8000"
cd ..

echo [OK] Backend starting on http://localhost:8000

:: Wait for backend to start
timeout /t 3 /nobreak >nul

:: ============================================
:: Start Frontend Server
:: ============================================
echo [3/4] Starting frontend server...
echo [%date% %time%] Starting frontend... >> "%LOGFILE%"

cd frontend
start "AI Negotiator - Frontend" cmd /k "npm run dev"
cd ..

echo [OK] Frontend starting on http://localhost:5173

:: ============================================
:: Wait and Open Browser
:: ============================================
echo [4/4] Waiting for servers to start...

timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   SERVERS ARE RUNNING!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Demo Login:
echo   Email: admin@negotiator.com
echo   Password: admin123
echo.
echo ========================================
echo.
echo Opening browser...
echo.

:: Open browser
start http://localhost:5173

echo [%date% %time%] Project started successfully >> "%LOGFILE%"

echo To stop the servers, run STOP-PROJECT.bat
echo.
echo Press any key to keep this window open...
pause >nul
