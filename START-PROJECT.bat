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
set LOGFILE=logs\start_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
set LOGFILE=%LOGFILE: =0%

echo [%date% %time%] Starting project... > "%LOGFILE%"

:: ============================================
:: Check if setup was run
:: ============================================
echo [1/5] Checking setup...
if not exist "backend\venv" (
    COLOR 0C
    echo.
    echo [ERROR] Backend virtual environment not found!
    echo Please run SETUP.bat first to install dependencies.
    echo.
    echo [%date% %time%] ERROR: Backend not set up >> "%LOGFILE%"
    pause
    exit /b 1
)

if not exist "frontend\node_modules" (
    COLOR 0C
    echo.
    echo [ERROR] Frontend node_modules not found!
    echo Please run SETUP.bat first to install dependencies.
    echo.
    echo [%date% %time%] ERROR: Frontend not set up >> "%LOGFILE%"
    pause
    exit /b 1
)

echo [OK] Setup verified

:: ============================================
:: Kill any existing processes on ports
:: ============================================
echo [2/5] Checking and clearing ports...
echo [%date% %time%] Checking ports... >> "%LOGFILE%"

:: Kill processes on port 5173 (Frontend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING') do (
    echo    Killing process on port 5173 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
    echo [%date% %time%] Killed PID %%a on port 5173 >> "%LOGFILE%"
)

:: Kill processes on port 8000 (Backend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000 ^| findstr LISTENING') do (
    echo    Killing process on port 8000 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
    echo [%date% %time%] Killed PID %%a on port 8000 >> "%LOGFILE%"
)

echo [OK] Ports cleared

:: ============================================
:: Start Backend Server
:: ============================================
echo [3/5] Starting backend server...
echo [%date% %time%] Starting backend... >> "%LOGFILE%"

:: Start backend in a new window
start "AI Negotiator - Backend (Port 8000)" cmd /k "cd /d "%SCRIPT_DIR%backend" && venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --port 8000"

echo [OK] Backend starting on http://localhost:8000

:: Wait for backend to initialize
echo    Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

:: ============================================
:: Start Frontend Server
:: ============================================
echo [4/5] Starting frontend server...
echo [%date% %time%] Starting frontend... >> "%LOGFILE%"

:: Start frontend in a new window
start "AI Negotiator - Frontend (Port 5173)" cmd /k "cd /d "%SCRIPT_DIR%frontend" && npm run dev"

echo [OK] Frontend starting on http://localhost:5173

:: ============================================
:: Wait and Open Browser
:: ============================================
echo [5/5] Waiting for servers to fully start...
echo    This may take 10-15 seconds...

timeout /t 10 /nobreak >nul

:: Check if backend is responding
echo    Checking backend health...
curl -s http://localhost:8000/health >nul 2>&1
if !errorlevel! equ 0 (
    echo [OK] Backend is responding
) else (
    echo [WARNING] Backend may still be starting...
)

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
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

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
echo - Keep those windows open while using the app
echo - To stop servers, run STOP-PROJECT.bat
echo - Or close the Backend and Frontend windows
echo.
echo ========================================
echo.
echo This window can be closed now.
echo Press any key to close...
pause >nul
