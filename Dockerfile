FROM node:20.8.0

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

CMD [ "npm","run", "start:dev" ]