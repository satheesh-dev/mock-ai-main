# Use an official Node.js image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock first (for better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the project files
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the Next.js port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
