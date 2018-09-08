import * as express from 'express';
import 'module-alias/register';
import env from 'src/env';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.listen(env.API_PORT, () => {
    global.console.log(`App is listening on port ${env.API_PORT}.`);
});
