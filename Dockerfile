# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container to /api
WORKDIR /api

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the code necessary for your API
COPY . .

# Env variables defining
ENV PORT=4001
ENV DB_NAME=postgres
ENV DB_USER=postgres
ENV DB_PASSWORD=Cosonic56

# Make the container listen on the specified port at runtime
EXPOSE $PORT

# Define the command to run your app using CMD which turns your container into an executable
CMD [ "npm", "start" ]