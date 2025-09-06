FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production --silent || npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]