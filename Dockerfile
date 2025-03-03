# Use an official Node.js image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the Next.js port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
