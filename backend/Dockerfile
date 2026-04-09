FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install openssl and curl
RUN apk add --no-cache openssl curl

# Install dependencies separately for better caching
COPY package*.json ./
RUN npm config set strict-ssl false && npm set registry http://registry.npmjs.org/ && npm install

# Copy prisma schema for client generation
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the source code and build
COPY . .
RUN npm run build

# Expose backend port
EXPOSE 5000

# Run the compiled application
CMD ["node", "dist/index.js"]
