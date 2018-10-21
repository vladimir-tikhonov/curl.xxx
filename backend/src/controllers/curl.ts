import * as express from 'express';

import { tryExecute } from 'src/execution';

export async function executeCommand(request: express.Request, response: express.Response, next: express.NextFunction) {
    const { command } = request.body as { command: string };
    const executionResults = await tryExecute(command);
    if (!executionResults.successfull) {
        response.status(400);
        response.json({ error: executionResults.message });
        next();
        return;
    }

    response.status(200);
    response.json({
        command,
        statusCode: executionResults.code,
        ip: executionResults.ip,
        headers: executionResults.headers,
        body: executionResults.body,
    });
    next();
}
