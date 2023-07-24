# Use the official Node.js 14.x LTS image as the base
FROM node:14

# Set the working directory inside the container for backend
WORKDIR /usr/src/app/backend

# Copy the backend app files
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend app files
COPY . .

# Expose the port on which your backend app will be served (if needed)
EXPOSE 5000

# Start the backend app (if needed)
CMD ["node", "index.js"]

