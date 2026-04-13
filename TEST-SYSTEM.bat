@echo off
COLOR 0B
TITLE System Test - AI Price Negotiator

echo.
echo ========================================
echo   SYSTEM TEST
echo ========================================
echo.
echo This will check if your system is ready.
echo.
pause

:: Get current directory
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

echo.
echo [TEST 1] Checking current directory...
echo Current directory: %CD%
echo.

if exist "backend" (
    echo [OK] Backend folder found
) else (
    echo [ERROR] Backend folder NOT found
)

if exist "frontend" (
    echo [OK] Frontend folder found
) else (
    echo [ERROR] Frontend folder NOT found
)

if exist "SETUP.bat" (
    echo [OK] SETUP.bat found
) else (
    echo [ERROR] SETUP.bat NOT found
)

echo.
echo [TEST 2] Checking Python...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=2" %%i in ('python --version 2^>^&1') do echo [OK] Python %%i found
) else (
    echo [ERROR] Python NOT found or not in PATH
    echo Install from: https://www.python.org/downloads/
)

echo.
echo [TEST 3] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=1" %%i in ('node --version 2^>^&1') do echo [OK] Node.js %%i found
) else (
    echo [ERROR] Node.js NOT found or not in PATH
    echo Install from: https://nodejs.org/
)

echo.
echo [TEST 4] Checking if setup was run...
if exist "backend\venv" (
    echo [OK] Backend virtual environment exists
) else (
    echo [ERROR] Backend NOT set up - Run SETUP.bat
)

if exist "frontend\node_modules" (
    echo [OK] Frontend node_modules exists
) else (
    echo [ERROR] Frontend NOT set up - Run SETUP.bat
)

echo.
echo [TEST 5] Checking ports...
netstat -ano | findstr :5173 | findstr LISTENING >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARNING] Port 5173 is already in use
    echo Run STOP-PROJECT.bat to free it
) else (
    echo [OK] Port 5173 is free
)

netstat -ano | findstr :8000 | findstr LISTENING >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARNING] Port 8000 is already in use
    echo Run STOP-PROJECT.bat to free it
) else (
    echo [OK] Port 8000 is free
)

echo.
echo ========================================
echo   TEST COMPLETE
echo ========================================
echo.
echo If you see any [ERROR] messages above:
echo 1. Install missing software (Python/Node.js)
echo 2. Run SETUP.bat to install dependencies
echo 3. Then try START-PROJECT.bat again
echo.
echo If all tests passed:
echo - You can run START-PROJECT.bat now
echo.
echo ========================================
echo.
pause
