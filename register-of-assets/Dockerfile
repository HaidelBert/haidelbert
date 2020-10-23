FROM node:12.19.0-alpine3.10

WORKDIR /usr/src/app

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000

CMD [ "node", "/usr/src/app/src/index.js" ]
