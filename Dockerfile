FROM node:25.6.1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
