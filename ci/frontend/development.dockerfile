FROM node:10-alpine

WORKDIR /opt/app/frontend
VOLUME ["/opt/app/frontend/src", "/opt/app/frontend/assets"]

COPY frontend/package.json /opt/app/frontend/package.json
COPY frontend/package-lock.json /opt/app/frontend/package-lock.json
RUN ["npm", "i"]

COPY frontend/webpack.config.js /opt/app/frontend/webpack.config.js
COPY frontend/tsconfig.json /opt/app/frontend/tsconfig.json
COPY frontend/tslint.json /opt/app/frontend/tslint.json
COPY frontend/.eslintrc /opt/app/frontend/.eslintrc

COPY shared/config/tsconfig.base.json /opt/app/shared/config/tsconfig.base.json
COPY shared/config/tslint.json /opt/app/shared/config/tslint.json
COPY shared/config/.eslintrc /opt/app/shared/config/.eslintrc

CMD ["npm", "start"]
