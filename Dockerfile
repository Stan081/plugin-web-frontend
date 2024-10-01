#Build stage
FROM node:20.11.1-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

#Production stage
FROM node:20.11.1-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production --force

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]