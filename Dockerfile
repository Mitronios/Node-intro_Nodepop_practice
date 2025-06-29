# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Set environment variables (optional)
ENV PORT=3000
ENV NODEPOP_ENV=production

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
