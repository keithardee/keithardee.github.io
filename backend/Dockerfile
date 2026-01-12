FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies (production only for container)
COPY package*.json ./
RUN npm ci --production

# Copy app source
COPY . ./

# Expose the port (Railway will map to configured port)
ENV PORT=4000
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
