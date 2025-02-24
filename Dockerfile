FROM node:20-slim

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
