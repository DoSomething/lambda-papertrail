FROM node:8.10-alpine

WORKDIR /usr/src/app

COPY package.json ./package.json

RUN npm install

COPY . .

CMD ["npm", "run", "test:ci"]
