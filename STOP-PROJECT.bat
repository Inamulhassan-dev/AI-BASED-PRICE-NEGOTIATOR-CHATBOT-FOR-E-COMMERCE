@echo off
SETLOCAL EnableDelayedExpansion
COLOR 0E
TITLE AI Price Negotiator - Stopping...

:: ============================================
:: STOP-PROJECT.BAT - Stop All Servers
:: ============================================

:: Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

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
:: Kill processes by port
:: ============================================
echo [1/4] Stopping servers by port...
echo [%date% %time%] Stopping servers... >> "%LOGFILE%"

set KILLED=0

:: Kill processes on port 5173 (Frontend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING') do (
    echo    Stopping Frontend (Port 5173, PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
    if !errorlevel! equ 0 (
        echo [OK] Frontend stopped
        set /a KILLED+=1
        echo [%date% %time%] Killed Frontend PID %%a >> "%LOGFILE%"
    )
)

:: Kill processes on port 8000 (Backend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000 ^| findstr LISTENING') do (
    echo    Stopping Backend (Port 8000, PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
    if !errorlevel! equ 0 (
        echo [OK] Backend stopped
        set /a KILLED+=1
        echo [%date% %time%] Killed Backend PID %%a >> "%LOGFILE%"
    )
)

if !KILLED! equ 0 (
    echo [INFO] No servers were running
)

:: ============================================
:: Kill processes by window title
:: ============================================
echo [2/4] Stopping servers by window title...

taskkill /FI "WINDOWTITLE eq AI Negotiator - Backend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq AI Negotiator - Frontend*" /F >nul 2>&1

:: ============================================
:: Kill Node and Python processes (optional)
:: ============================================
echo [3/4] Cleaning up related processes...

:: Kill uvicorn processes
taskkill /F /IM uvicorn.exe >nul 2>&1

:: Kill node processes running on our ports
for /f "tokens=2" %%a in ('tasklist ^| findstr node.exe') do (
    netstat -ano | findstr :5173 | findstr %%a >nul 2>&1
    if !errorlevel! equ 0 (
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo [OK] Cleanup complete

:: ============================================
:: Verify ports are free
:: ============================================
echo [4/4] Verifying ports are free...

netstat -ano | findstr :5173 | findstr LISTENING >nul 2>&1
if !errorlevel! equ 0 (
    COLOR 0C
    echo [WARNING] Port 5173 is still in use
    echo You may need to restart your computer
) else (
    echo [OK] Port 5173 is free
)

netstat -ano | findstr :8000 | findstr LISTENING >nul 2>&1
if !errorlevel! equ 0 (
    COLOR 0C
    echo [WARNING] Port 8000 is still in use
    echo You may need to restart your computer
) else (
    echo [OK] Port 8000 is free
)

:: ============================================
:: Optional: Clean temporary files
:: ============================================
echo.
echo Do you want to clean temporary files? (Y/N)
set /p CLEAN="Enter choice: "

if /i "!CLEAN!"=="Y" (
    echo.
    echo Cleaning temporary files...
    
    :: Clean Python cache
    if exist "backend\__pycache__" (
        rd /s /q "backend\__pycache__" 2>nul
        echo [OK] Cleaned backend __pycache__
    )
    
    for /d /r "backend" %%d in (__pycache__) do (
        if exist "%%d" rd /s /q "%%d" 2>nul
    )
    
    :: Clean frontend cache
    if exist "frontend\.vite" (
        rd /s /q "frontend\.vite" 2>nul
        echo [OK] Cleaned frontend .vite cache
    )
    
    echo [OK] Temporary files cleaned
)

:: ============================================
:: SUCCESS!
:: ============================================
COLOR 0A
echo.
echo ========================================
echo   ALL SERVERS STOPPED!
echo ========================================
echo.
echo Ports 5173 and 8000 are now free.
echo.
echo To start again, run START-PROJECT.bat
echo.
echo ========================================
echo.
echo [%date% %time%] Project stopped successfully >> "%LOGFILE%"

echo Press any key to exit...
pause >nul
