@echo off
echo Starting local server...
echo Please open your browser and go to: http://localhost:8000
echo To stop the server, close this window
python -m http.server 8000
pause
