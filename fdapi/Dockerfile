# FROM node:14-alpine3.15

FROM node:14-alpine3.15 AS development

WORKDIR /app

#RUN chown -R node:node /app

#USER node 

COPY package.json .

#RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]