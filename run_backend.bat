@echo off

REM Navigate to the back directory

REM Create a virtual environment if it doesn't exist
if not exist venv (
    python -m venv venv
)

REM Activate the virtual environment
if exist venv\Scripts\activate (
    call venv\Scripts\activate
) else (
    echo Failed to activate virtual environment.
    exit /b
)
cd back || exit /b
REM Install dependencies
pip install -r requirements.txt
if errorlevel 1 (
    echo Failed to install dependencies.
    exit /b
)

REM Run the FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000
if errorlevel 1 (
    echo Failed to start the server.
    exit /b
)
