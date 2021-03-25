FROM node:lts-slim

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf ./src

ARG DEV

RUN if [ "$DEV" = "true" ]; then npx prisma migrate deploy ; fi

CMD [ "node", "/usr/app/build/index.js" ]