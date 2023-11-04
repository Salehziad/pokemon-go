FROM node:16.19.1-alpine3.16

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 8080

CMD [ "npm", "start" ]