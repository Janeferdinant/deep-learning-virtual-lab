@echo off
TITLE Deep Learning Virtual Laboratory (MRCET R20A6683)
echo ======================================================================
echo    DEEP LEARNING VIRTUAL LABORATORY - LEARNING PLATFORM
echo    Course Code: R20A6683 ^| B.Tech IV Year - I Semester
echo    Malla Reddy College of Engineering ^& Technology (Autonomous)
echo ======================================================================
echo.

echo [1/3] Checking Python backend dependencies...
start "DL Lab Python Backend (FastAPI)" cmd /k "cd /d %~dp0backend && python main.py"

echo [2/3] Starting React + Vite Frontend Server...
start "DL Lab Interactive Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo [3/3] Opening Interactive Lab in your default browser...
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo ======================================================================
echo Lab platform is live!
echo Frontend: http://localhost:5173
echo Backend API docs: http://localhost:8000/docs
echo Close the respective terminal windows to terminate servers.
echo ======================================================================

