#!/bin/bash

echo "========================================"
echo "Cross-Origin Tab Navigation Test"
echo "========================================"
echo ""
echo "This script will start two HTTP servers:"
echo "- App A on http://localhost:8080"
echo "- App B on http://localhost:8081"
echo ""
echo "Press Ctrl+C to stop both servers when done."
echo "========================================"
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "ERROR: Python is not installed"
    echo "Please install Python from https://www.python.org/"
    exit 1
fi

# Determine Python command
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
else
    PYTHON_CMD="python"
fi

echo "Using: $PYTHON_CMD"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Starting servers..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $PID_A $PID_B 2>/dev/null
    echo "Servers stopped."
    exit 0
}

trap cleanup INT TERM

# Start App A on port 8080
echo "[1/2] Starting App A on port 8080..."
cd "$SCRIPT_DIR/appA-cross-origin"
$PYTHON_CMD -m http.server 8080 > /dev/null 2>&1 &
PID_A=$!

# Start App B on port 8081
echo "[2/2] Starting App B on port 8081..."
cd "$SCRIPT_DIR/appB-cross-origin"
$PYTHON_CMD -m http.server 8081 > /dev/null 2>&1 &
PID_B=$!

# Wait a moment for servers to start
sleep 2

echo ""
echo "========================================"
echo "Servers started successfully!"
echo "========================================"
echo ""
echo "App A: http://localhost:8080"
echo "App B: http://localhost:8081"
echo ""
echo "App A PID: $PID_A"
echo "App B PID: $PID_B"
echo ""
echo "Opening App A in your browser..."
echo ""

# Open browser (works on macOS and most Linux)
if command -v open &> /dev/null; then
    open http://localhost:8080
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8080
else
    echo "Please open http://localhost:8080 in your browser"
fi

echo ""
echo "Press Ctrl+C to stop both servers"
echo "========================================"

# Wait for user to press Ctrl+C
wait


