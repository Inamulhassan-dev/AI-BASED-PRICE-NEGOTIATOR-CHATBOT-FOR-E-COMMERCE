@echo off
SETLOCAL EnableDelayedExpansion
COLOR 0A
TITLE AI Price Negotiator - Complete Setup

:: ============================================
:: SETUP.BAT - Complete Project Setup
:: Automatically installs all dependencies
:: ============================================

:: Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

echo.
echo ========================================
echo   AI PRICE NEGOTIATOR - SETUP
echo ========================================
echo.
echo This will automatically:
echo  [1] Check Python installation
echo  [2] Check Node.js installation
echo  [3] Install all backend dependencies
echo  [4] Install all frontend dependencies
echo  [5] Initialize database with demo data
echo  [6] Verify everything is ready
echo.
echo ========================================
echo.
pause

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
if !errorlevel! neq 0 (
    COLOR 0C
    echo.
    echo [ERROR] Python is not installed or not in PATH!
    echo.
    echo Please install Python 3.10 or higher from:
    echo https://www.python.org/downloads/
    echo.
    echo IMPORTANT: Check "Add Python to PATH" during installation!
    echo.
    echo [%date% %time%] ERROR: Python not found >> "%LOGFILE%"
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
if !errorlevel! neq 0 (
    COLOR 0C
    echo.
    echo [ERROR] Node.js is not installed or not in PATH!
    echo.
    echo Please install Node.js 18 or higher from:
    echo https://nodejs.org/
    echo.
    echo [%date% %time%] ERROR: Node.js not found >> "%LOGFILE%"
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

cd /d "%SCRIPT_DIR%backend"

:: Check if virtual environment exists
if not exist "venv" (
    echo    Creating Python virtual environment...
    python -m venv venv >> "%SCRIPT_DIR%%LOGFILE%" 2>&1
    if !errorlevel! neq 0 (
        COLOR 0C
        echo [ERROR] Failed to create virtual environment!
        echo Check %LOGFILE% for details
        cd /d "%SCRIPT_DIR%"
        pause
        exit /b 1
    )
    echo [OK] Virtual environment created
) else (
    echo [OK] Virtual environment already exists
)

:: Activate virtual environment and install dependencies
echo    Installing Python packages (this may take 2-3 minutes)...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip >> "%SCRIPT_DIR%%LOGFILE%" 2>&1
pip install -r requirements.txt >> "%SCRIPT_DIR%%LOGFILE%" 2>&1
if !errorlevel! neq 0 (
    COLOR 0C
    echo [ERROR] Failed to install Python packages!
    echo Check %LOGFILE% for details
    cd /d "%SCRIPT_DIR%"
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed (35+ packages)

cd /d "%SCRIPT_DIR%"

:: ============================================
:: STEP 4: Setup Frontend
:: ============================================
echo [STEP 4/6] Setting up frontend...
echo [%date% %time%] Setting up frontend... >> "%LOGFILE%"

cd /d "%SCRIPT_DIR%frontend"

:: Install npm packages
if not exist "node_modules" (
    echo    Installing Node.js packages (this may take 3-5 minutes)...
    call npm install >> "%SCRIPT_DIR%%LOGFILE%" 2>&1
    if !errorlevel! neq 0 (
        COLOR 0C
        echo [ERROR] Failed to install Node.js packages!
        echo Check %LOGFILE% for details
        cd /d "%SCRIPT_DIR%"
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)

cd /d "%SCRIPT_DIR%"

:: ============================================
:: STEP 5: Initialize Database
:: ============================================
echo [STEP 5/6] Initializing database...
echo [%date% %time%] Initializing database... >> "%LOGFILE%"

cd /d "%SCRIPT_DIR%backend"
call venv\Scripts\activate.bat

:: Delete old database if exists
if exist "negotiator.db" (
    echo    Removing old database...
    del /f /q negotiator.db >nul 2>&1
)

:: Initialize new database
echo    Creating database with demo data...
python init_demo_data.py >> "%SCRIPT_DIR%%LOGFILE%" 2>&1
if !errorlevel! neq 0 (
    COLOR 0E
    echo [WARNING] Database initialization had issues
    echo Check %LOGFILE% for details
) else (
    echo [OK] Database initialized with 8 demo products
)

cd /d "%SCRIPT_DIR%"

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
if not exist "backend\venv\Scripts\python.exe" (
    echo [ERROR] Python executable missing in venv
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
if not exist "frontend\src\App.jsx" (
    echo [ERROR] Frontend App.jsx missing
    set /a ERRORS+=1
)

if !ERRORS! gtr 0 (
    COLOR 0C
    echo.
    echo [ERROR] Setup completed with !ERRORS! error(s)
    echo Check %LOGFILE% for details
    echo.
    pause
    exit /b 1
)

echo [OK] All files verified

:: ============================================
:: SUCCESS!
:: ============================================
COLOR 0A
echo.
echo ========================================
echo   SETUP COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Your AI Price Negotiator is ready to use!
echo.
echo NEXT STEPS:
echo  1. Double-click START-PROJECT.bat
echo  2. Wait for servers to start (10-15 seconds)
echo  3. Browser will open automatically
echo  4. Login with demo credentials:
echo     Email:    admin@negotiator.com
echo     Password: admin123
echo.
echo DEMO DATA INCLUDED:
echo  - 8 Products across multiple categories
echo  - 1 Admin account
echo  - Ready for AI price negotiation
echo.
echo ========================================
echo.
echo [%date% %time%] Setup completed successfully >> "%LOGFILE%"

echo Press any key to exit...
pause >nul
