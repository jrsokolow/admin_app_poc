@echo off
echo ========================================
echo Cross-Origin Tab Navigation Test
echo ========================================
echo.
echo This script will start two HTTP servers:
echo - App A on http://localhost:8080
echo - App B on http://localhost:8081
echo.
echo Press Ctrl+C to stop both servers when done.
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo Starting servers...
echo.

REM Start App A on port 8080
echo [1/2] Starting App A on port 8080...
start "App A Server (Port 8080)" cmd /k "cd /d %~dp0appA-cross-origin && python -m http.server 8080"

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start App B on port 8081
echo [2/2] Starting App B on port 8081...
start "App B Server (Port 8081)" cmd /k "cd /d %~dp0appB-cross-origin && python -m http.server 8081"

REM Wait a moment
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo Servers started successfully!
echo ========================================
echo.
echo App A: http://localhost:8080
echo App B: http://localhost:8081
echo.
echo Opening App A in your browser...
echo.

REM Open browser to App A
start http://localhost:8080

echo.
echo To stop the servers:
echo 1. Close both server windows, or
echo 2. Press Ctrl+C in each server window
echo.
echo ========================================
pause



