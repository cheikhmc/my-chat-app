@echo off

REM Navigate to the back directory
cd back

REM Create a virtual environment
python -m venv venv

REM Activate the virtual environment
call venv\Scripts\activate

REM Install dependencies
pip install -r requirements.txt

REM Run the FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000
