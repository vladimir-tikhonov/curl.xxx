FROM node:10-alpine

VOLUME ["/opt/app/backend", "/opt/app/backend/node_modules", "/opt/app/backend/dist", "/opt/app/shared"]

RUN apk add --no-cache curl

WORKDIR /opt/app/backend

CMD npm i --no-package-lock && npm start
