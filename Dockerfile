# Build stage
FROM node:20.11.1-alpine

WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile
RUN yarn install

# Copy the rest of the app
COPY . .

# Build the application
RUN yarn build

#Serve the build
CMD ["npx", "serve", "-s", "build"]
