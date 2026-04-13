@echo off
SETLOCAL EnableDelayedExpansion
COLOR 0C
TITLE AI Price Negotiator - Stopping...

:: ============================================
:: STOP-PROJECT.BAT - Stop All Servers & Clean
:: ============================================

echo.
echo ========================================
echo   AI PRICE NEGOTIATOR - STOPPING
echo ========================================
echo.

:: Create logs directory
if not exist "logs" mkdir logs
set LOGFILE=logs\stop_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
set LOGFILE=%LOGFILE: =0%

echo [%date% %time%] Stopping project... > "%LOGFILE%"

:: ============================================
:: Stop All Node.js Processes
:: ============================================
echo [1/5] Stopping Node.js processes...
echo [%date% %time%] Stopping Node.js... >> "%LOGFILE%"

tasklist | findstr /i "node.exe" >nul 2>&1
if %errorlevel% equ 0 (
    taskkill /F /IM node.exe >nul 2>&1
    echo [OK] Node.js processes stopped
) else (
    echo [OK] No Node.js processes running
)

:: ============================================
:: Stop All Python Processes
:: ============================================
echo [2/5] Stopping Python processes...
echo [%date% %time%] Stopping Python... >> "%LOGFILE%"

tasklist | findstr /i "python.exe" >nul 2>&1
if %errorlevel% equ 0 (
    taskkill /F /IM python.exe >nul 2>&1
    echo [OK] Python processes stopped
) else (
    echo [OK] No Python processes running
)

:: ============================================
:: Free Ports
:: ============================================
echo [3/5] Freeing ports 5173 and 8000...
echo [%date% %time%] Freeing ports... >> "%LOGFILE%"

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [OK] Ports freed

:: ============================================
:: Clean Temporary Files
:: ============================================
echo [4/5] Cleaning temporary files...
echo [%date% %time%] Cleaning temp files... >> "%LOGFILE%"

:: Clean Python cache
if exist "backend\__pycache__" (
    rd /s /q "backend\__pycache__" 2>nul
)
for /d /r "backend" %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d" 2>nul

:: Clean Python .pyc files
del /s /q "backend\*.pyc" >nul 2>&1

:: Clean old log files (keep last 10)
cd logs 2>nul
if exist "*.log" (
    for /f "skip=10 delims=" %%f in ('dir /b /o-d *.log 2^>nul') do del "%%f" 2>nul
)
cd ..

echo [OK] Temporary files cleaned

:: ============================================
:: Optional: Clean Build Files
:: ============================================
echo [5/5] Do you want to clean build files? (This will require re-running SETUP.bat)
echo.
echo Options:
echo   [1] No - Keep everything (recommended)
echo   [2] Yes - Clean node_modules and venv (saves space)
echo.
set /p CLEAN_CHOICE="Enter choice (1 or 2): "

if "%CLEAN_CHOICE%"=="2" (
    echo.
    echo Cleaning build files...
    
    if exist "frontend\node_modules" (
        echo Removing frontend\node_modules...
        rd /s /q "frontend\node_modules" 2>nul
        echo [OK] node_modules removed
    )
    
    if exist "backend\venv" (
        echo Removing backend\venv...
        rd /s /q "backend\venv" 2>nul
        echo [OK] venv removed
    )
    
    echo.
    echo [WARNING] Build files removed!
    echo Run SETUP.bat before starting the project again.
) else (
    echo [OK] Build files kept
)

:: ============================================
:: SUCCESS!
:: ============================================
echo.
echo ========================================
echo   PROJECT STOPPED SUCCESSFULLY!
echo ========================================
echo.
echo All servers have been stopped.
echo Temporary files have been cleaned.
echo.
echo To start again, run START-PROJECT.bat
echo.
echo ========================================
echo.
echo [%date% %time%] Project stopped successfully >> "%LOGFILE%"

pause
