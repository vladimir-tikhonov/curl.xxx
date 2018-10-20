FROM node:10-alpine

VOLUME ["/opt/app/frontend", "/opt/app/frontend/node_modules", "/opt/app/shared"]

WORKDIR /opt/app/frontend

CMD npm i && npm start
