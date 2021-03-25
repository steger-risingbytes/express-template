FROM node:lts-slim

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

RUN rm 

CMD [ "node", "/usr/app/build/index.js" ]