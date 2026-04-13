@echo off
TITLE AI Price Negotiator - Simple Start

echo.
echo ========================================
echo   AI PRICE NEGOTIATOR
echo   Simple Start Script
echo ========================================
echo.
echo This script will:
echo 1. Start the backend server
echo 2. Start the frontend server
echo 3. Open your browser
echo.
echo Press any key to continue...
pause >nul

:: Change to script directory
cd /d "%~dp0"

echo.
echo Current directory: %CD%
echo.

:: Check folders exist
if not exist "backend" (
    echo ERROR: Backend folder not found!
    echo Make sure you're in the project root directory.
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ERROR: Frontend folder not found!
    echo Make sure you're in the project root directory.
    pause
    exit /b 1
)

:: Check setup was done
if not exist "backend\venv" (
    echo ERROR: Backend not set up!
    echo Please run SETUP.bat first.
    pause
    exit /b 1
)

if not exist "frontend\node_modules" (
    echo ERROR: Frontend not set up!
    echo Please run SETUP.bat first.
    pause
    exit /b 1
)

echo All checks passed!
echo.
echo Starting servers...
echo.

:: Start backend
echo Starting backend server...
start "Backend Server" cmd /k "cd /d "%~dp0backend" && venv\Scripts\activate && python -m uvicorn app.main:app --reload --port 8000"
echo Backend window opened!
echo.

:: Wait a bit
timeout /t 3 /nobreak >nul

:: Start frontend
echo Starting frontend server...
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && npm run dev"
echo Frontend window opened!
echo.

:: Wait for servers to start
echo Waiting for servers to start (10 seconds)...
timeout /t 10 /nobreak >nul

:: Open browser
echo Opening browser...
start http://localhost:5173

echo.
echo ========================================
echo   SERVERS STARTED!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Login with:
echo   Email: admin@negotiator.com
echo   Password: admin123
echo.
echo Keep the Backend and Frontend windows open!
echo.
echo Press any key to close this window...
pause >nul
