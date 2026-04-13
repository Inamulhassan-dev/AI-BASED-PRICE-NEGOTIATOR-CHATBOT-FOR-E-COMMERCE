@echo off
SETLOCAL EnableDelayedExpansion
COLOR 0A
TITLE AI Price Negotiator - Complete Setup

:: ============================================
:: SETUP.BAT - Complete Project Setup
:: Automatically installs all dependencies
:: ============================================

echo.
echo ========================================
echo   AI PRICE NEGOTIATOR - SETUP
echo ========================================
echo.
echo This will automatically:
echo  [1] Check and install Python
echo  [2] Check and install Node.js
echo  [3] Install all backend dependencies
echo  [4] Install all frontend dependencies
echo  [5] Initialize database with demo data
echo  [6] Verify everything is ready
echo.
echo ========================================
echo.

:: Create logs directory
if not exist "logs" mkdir logs
set LOGFILE=logs\setup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
set LOGFILE=%LOGFILE: =0%

echo [%date% %time%] Starting setup... > "%LOGFILE%"

:: ============================================
:: STEP 1: Check Python
:: ============================================
echo [STEP 1/6] Checking Python installation...
echo [%date% %time%] Checking Python... >> "%LOGFILE%"

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Python is not installed!
    echo.
    echo Please install Python 3.10 or higher from:
    echo https://www.python.org/downloads/
    echo.
    echo Make sure to check "Add Python to PATH" during installation!
    echo.
    pause
    exit /b 1
)

for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
echo [OK] Python %PYTHON_VERSION% found
echo [%date% %time%] Python %PYTHON_VERSION% found >> "%LOGFILE%"

:: ============================================
:: STEP 2: Check Node.js
:: ============================================
echo [STEP 2/6] Checking Node.js installation...
echo [%date% %time%] Checking Node.js... >> "%LOGFILE%"

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js 18 or higher from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=1" %%i in ('node --version 2^>^&1') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found
echo [%date% %time%] Node.js %NODE_VERSION% found >> "%LOGFILE%"

:: ============================================
:: STEP 3: Setup Backend
:: ============================================
echo [STEP 3/6] Setting up backend...
echo [%date% %time%] Setting up backend... >> "%LOGFILE%"

cd backend

:: Check if virtual environment exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv >> "..\%LOGFILE%" 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to create virtual environment!
        cd ..
        pause
        exit /b 1
    )
    echo [OK] Virtual environment created
)

:: Activate virtual environment
call venv\Scripts\activate.bat

:: Install dependencies
echo Installing Python packages...
echo This may take 2-3 minutes...
python -m pip install --upgrade pip >> "..\%LOGFILE%" 2>&1
pip install -r requirements.txt >> "..\%LOGFILE%" 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install Python packages!
    echo Check logs\setup.log for details
    cd ..
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed

cd ..

:: ============================================
:: STEP 4: Setup Frontend
:: ============================================
echo [STEP 4/6] Setting up frontend...
echo [%date% %time%] Setting up frontend... >> "%LOGFILE%"

cd frontend

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing Node.js packages...
    echo This may take 3-5 minutes...
    call npm install >> "..\%LOGFILE%" 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install Node.js packages!
        echo Check logs\setup.log for details
        cd ..
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)

cd ..

:: ============================================
:: STEP 5: Initialize Database
:: ============================================
echo [STEP 5/6] Initializing database...
echo [%date% %time%] Initializing database... >> "%LOGFILE%"

cd backend
call venv\Scripts\activate.bat
python init_demo_data.py >> "..\%LOGFILE%" 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Database initialization had issues (may already be initialized)
) else (
    echo [OK] Database initialized with demo data
)
cd ..

:: ============================================
:: STEP 6: Verify Installation
:: ============================================
echo [STEP 6/6] Verifying installation...
echo [%date% %time%] Verifying installation... >> "%LOGFILE%"

set ERRORS=0

:: Check backend files
if not exist "backend\venv" (
    echo [ERROR] Backend virtual environment missing
    set /a ERRORS+=1
)
if not exist "backend\requirements.txt" (
    echo [ERROR] Backend requirements.txt missing
    set /a ERRORS+=1
)
if not exist "backend\app\main.py" (
    echo [ERROR] Backend main.py missing
    set /a ERRORS+=1
)

:: Check frontend files
if not exist "frontend\node_modules" (
    echo [ERROR] Frontend node_modules missing
    set /a ERRORS+=1
)
if not exist "frontend\package.json" (
    echo [ERROR] Frontend package.json missing
    set /a ERRORS+=1
)
if not exist "frontend\src\App.jsx" (
    echo [ERROR] Frontend App.jsx missing
    set /a ERRORS+=1
)

if %ERRORS% gtr 0 (
    echo.
    echo [ERROR] Setup completed with %ERRORS% error(s)
    echo Check logs\setup.log for details
    echo.
    pause
    exit /b 1
)

:: ============================================
:: SUCCESS!
:: ============================================
echo.
echo ========================================
echo   SETUP COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Your AI Price Negotiator is ready!
echo.
echo Next steps:
echo  1. Run START-PROJECT.bat to launch the application
echo  2. Open http://localhost:5173 in your browser
echo  3. Login with: admin@negotiator.com / admin123
echo.
echo ========================================
echo.
echo [%date% %time%] Setup completed successfully >> "%LOGFILE%"

pause
