# docker build -t krismt/alpine-node .
FROM node:8.9-alpine

RUN apk update
RUN apk upgrade
RUN apk add python make g++

RUN npm -g install nodemon
RUN npm -g install serve
WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]
