FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies (production only for container)
# Copy only package.json to avoid using an out-of-date package-lock that
# may reference packages not available in the registry. This lets the
# container install compatible versions directly.
COPY package.json ./
RUN npm install --production

# Copy app source
COPY . ./

# Expose the port (Railway will map to configured port)
ENV PORT=4000
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
