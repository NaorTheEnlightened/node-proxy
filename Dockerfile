# Use an official Node runtime as a parent image
FROM node:14.16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install --only=production

# Copy the app source code into the container
COPY . .

# Expose port 3004 to be accessible outside the container
EXPOSE 3004

# Define the command to run the app using CMD which defines your runtime 
CMD ["node", "server.js"]
