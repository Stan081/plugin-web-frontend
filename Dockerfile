# Build stage
FROM node:20.11.1-alpine AS build

WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile
RUN yarn install

# Copy the rest of the app
COPY . .

# Build the application
RUN yarn build

#Serve the build
CMD ["npx", "serve", "-s", "build"]

# # Production stage
# FROM node:20.11.1-alpine AS production

# WORKDIR /app

# # Copy production dependencies
# COPY package*.json yarn.lock ./
# RUN yarn install --frozen-lockfile --production

# # Copy built assets from build stage
# COPY --from=build /app/dist ./dist

# # Start the application
# CMD ["node", "dist/index.js"]
