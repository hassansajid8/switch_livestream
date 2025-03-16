FROM node:22-alpine
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install
COPY build ./build
CMD ["node", "build"]
