# docker build -t krismt/alpine-node .
FROM node:8.9-alpine

RUN npm -g install nodemon
WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]
