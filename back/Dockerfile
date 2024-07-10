# Use an official Python runtime as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set the command to run the FastAPI server with Gunicorn and Uvicorn workers
CMD ["gunicorn", "-c", "gunicorn.conf.py", "app.main:app"]

# Expose the port the app runs on
EXPOSE 8000
