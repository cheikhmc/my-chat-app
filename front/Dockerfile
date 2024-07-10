# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Set the command to serve the app
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
