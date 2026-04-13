@echo off
SETLOCAL EnableDelayedExpansion
COLOR 0E
TITLE Cleanup for Git Commit

:: ============================================
:: CLEANUP-FOR-GIT.BAT
:: Removes files that shouldn't be in repo
:: ============================================

echo.
echo ========================================
echo   CLEANUP FOR GIT COMMIT
echo ========================================
echo.
echo This will remove:
echo  - backend/venv/
echo  - backend/negotiator.db
echo  - backend/.env
echo  - frontend/node_modules/
echo  - logs/
echo  - Debug files
echo.
echo These will be recreated by SETUP.bat
echo.
set /p CONFIRM="Continue? (Y/N): "

if /i not "%CONFIRM%"=="Y" (
    echo Cancelled.
    pause
    exit /b 0
)

echo.
echo Cleaning...

:: Remove backend venv
if exist "backend\venv" (
    echo Removing backend\venv...
    rd /s /q "backend\venv" 2>nul
    echo [OK] Removed
)

:: Remove database
if exist "backend\negotiator.db" (
    echo Removing backend\negotiator.db...
    del /f /q "backend\negotiator.db" 2>nul
    echo [OK] Removed
)

:: Remove .env (keep .env.example)
if exist "backend\.env" (
    echo Removing backend\.env...
    del /f /q "backend\.env" 2>nul
    echo [OK] Removed
)

:: Remove frontend node_modules
if exist "frontend\node_modules" (
    echo Removing frontend\node_modules...
    rd /s /q "frontend\node_modules" 2>nul
    echo [OK] Removed
)

:: Remove package-lock.json
if exist "frontend\package-lock.json" (
    echo Removing frontend\package-lock.json...
    del /f /q "frontend\package-lock.json" 2>nul
    echo [OK] Removed
)

:: Remove logs
if exist "logs" (
    echo Removing logs...
    rd /s /q "logs" 2>nul
    echo [OK] Removed
)

:: Remove debug files
del /f /q "frontend\*DEBUG*.md" 2>nul
del /f /q "frontend\ThemeDiagnostic.jsx" 2>nul

echo.
echo ========================================
echo   CLEANUP COMPLETE!
echo ========================================
echo.
echo Your repository is now clean and ready for:
echo  - git add .
echo  - git commit -m "message"
echo  - git push
echo.
echo New users will run SETUP.bat to recreate everything.
echo.
pause
