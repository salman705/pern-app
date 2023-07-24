# Use the official Node.js 14.x LTS image as the base
FROM node:14

# Set the working directory inside the container for frontend
WORKDIR /usr/src/app/frontend

# Copy the frontend app files
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend app files
COPY . .

# Build the frontend app
RUN npm run build

# Expose the port on which your frontend app will be served (if needed)
EXPOSE 3000

# Start the frontend app (if needed)
CMD ["npm", "start"]
