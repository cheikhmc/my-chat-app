#!/bin/bash

# Ensure the script stops if there's an error
set -e

# Navigate to the back directory
cd back

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activate the virtual environment based on the operating system
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
  # Linux or macOS
  source venv/bin/activate
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
  # Windows
  source venv/Scripts/activate
else
  echo "Unsupported OS: $OSTYPE"
  exit 1
fi

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server with Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000
