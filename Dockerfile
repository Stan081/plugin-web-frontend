# Use Node.js as the base image
FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile
#RUN yarn install 
# Copy the app's source code to the container
COPY . .

ENV NEXT_PUBLIC_BASE_URL='https://test-api.pluginent.com'
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyAcp_C3w1_jDg2YZVv86mJ23cq_oPvQj1I"
ENV NEXT_PUBLIC_WEB_URL='https://test.pluginent.com'
# Build the Next app
RUN yarn build:prod

# Serve the production build
CMD ["yarn", "start"]