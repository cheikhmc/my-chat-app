@echo off
SETLOCAL

REM Navigate to the front directory
cd front

REM Check for node_modules and install dependencies if not present
if not exist "node_modules" (
  echo Installing dependencies...
  npm install
)

REM Start the React development server
echo Starting the React development server...
npm start

ENDLOCAL
