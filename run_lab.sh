#!/usr/bin/env bash
# Deep Learning Virtual Laboratory (MRCET R20A6683)

echo "======================================================================"
echo "   DEEP LEARNING VIRTUAL LABORATORY - LEARNING PLATFORM"
echo "   Course Code: R20A6683 | B.Tech IV Year - I Semester"
echo "   Malla Reddy College of Engineering & Technology (Autonomous)"
echo "======================================================================"
echo ""

# Start backend
echo "[1/2] Launching Python FastAPI Backend on port 8000..."
python backend/main.py &
BACKEND_PID=$!

# Start frontend
echo "[2/2] Launching React Vite Frontend on port 5173..."
cd frontend && npm run dev &
FRONTEND_PID=$!

echo "Lab platform is live at http://localhost:5173"
echo "Press Ctrl+C to terminate both servers."

trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT
wait

