FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
RUN npm install
COPY server.js ./
CMD ["npm", "start"]