#!/bin/bash

# Ensure the script stops if there's an error
set -e

# Navigate to the front directory
cd front

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the React development server
echo "Starting the React development server..."
npm start

