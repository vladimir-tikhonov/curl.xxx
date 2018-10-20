import express from 'express';
import * as helmet from 'helmet';
import 'module-alias/register';
import * as path from 'path';
import createSwaggerMiddleware from 'swagger-express-middleware';

import * as curlController from 'src/controllers/curl';
import env from 'src/env';

const SWAGGER_SPEC_PATH = path.join(__dirname, '..', 'api.yaml');
const app = express();

app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.noSniff());

createSwaggerMiddleware(SWAGGER_SPEC_PATH, app, (error, middleware) => {
    if (error) {
        throw error;
    }

    app.use(middleware.metadata(), middleware.CORS(), middleware.parseRequest(), middleware.validateRequest());

    app.post('/curl', curlController.executeCommand);

    app.listen(env.API_PORT, () => {
        global.console.log(`App is listening on port ${env.API_PORT}.`);
    });
});
