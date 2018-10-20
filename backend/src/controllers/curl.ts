import * as express from 'express';

import { buildCommandFromString, extractMetadata, sanitizeCommand } from 'src/curl';

export function executeCommand(request: express.Request, response: express.Response) {
    const commandString = sanitizeCommand(request.body.command as string);
    const buildResult = buildCommandFromString(commandString);
    if (!buildResult.successfull) {
        sendBadRequest(response);
        return;
    }

    const metadata = extractMetadata(buildResult.curlCommand);
    response.json({ url: metadata.url });
}

function sendBadRequest(response: express.Response) {
    response.status(400);
    response.json({ error: 'Invalid command' });
}
