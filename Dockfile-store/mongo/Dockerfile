# docker build -t krismt/alpine-mongo ./mongo
FROM alpine:edge

RUN apk update && apk upgrade
RUN apk add --no-cache mongodb && \
rm /usr/bin/mongoperf
RUN apk add mongodb-tools

VOLUME /data/db
EXPOSE 27017 27017

COPY run.sh /root
RUN chmod +x /root/run.sh
ENTRYPOINT [ "/root/run.sh" ]
CMD [ "mongod" ]
