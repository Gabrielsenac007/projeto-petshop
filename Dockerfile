# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

# Production
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./
RUN npm install --omit=dev
EXPOSE 3000
CMD [ "node", "dist/server.js" ]
