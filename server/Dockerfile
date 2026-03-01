FROM node:20-alpine

# Install build dependencies for sqlite3 native compilation
RUN apk add --no-cache python3 make g++ 

WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy server source
COPY . .

EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
