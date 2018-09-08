FROM node:10-alpine

WORKDIR /opt/app/backend
VOLUME ["/opt/app/backend/src"]

COPY backend/package.json /opt/app/backend/package.json
COPY backend/package-lock.json /opt/app/backend/package-lock.json
RUN ["npm", "i"]

COPY backend/tsconfig.json /opt/app/backend/tsconfig.json
COPY backend/tslint.json /opt/app/backend/tslint.json

COPY shared/config/tsconfig.base.json /opt/app/shared/config/tsconfig.base.json
COPY shared/config/tslint.json /opt/app/shared/config/tslint.json
COPY shared/config/.eslintrc /opt/app/shared/config/.eslintrc

CMD ["npm", "start"]
