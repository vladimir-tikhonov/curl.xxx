FROM node:10-alpine

VOLUME ["/opt/app/backend", "/opt/app/backend/node_modules", "/opt/app/backend/dist", "/opt/app/shared"]

WORKDIR /opt/app/backend

CMD npm i && npm start
