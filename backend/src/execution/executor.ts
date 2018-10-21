import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as tmp from 'tmp';
import * as util from 'util';

import {
    bindPayloadToApplierFunction,
    buildCommandFromString,
    combineApplierFunctions,
    CurlCommand,
    dumpHeaderApplier,
    outputApplier,
    sanitizeCommand,
    showErrorApplier,
    silentApplier,
    strinfigyCurlCommand,
    writeOutApplier,
} from 'src/curl';

const execAsync = util.promisify(childProcess.exec);
const readFileAsync = util.promisify(fs.readFile);

type ExecutionResults =
    | { successfull: true; code: number; ip: string; headers: string[]; body: string }
    | { successfull: false; message: string };

export async function tryExecute(rawCommandString: string): Promise<ExecutionResults> {
    const [outputFileName, headersFileName] = await Promise.all([getTempFileNameAsync(), getTempFileNameAsync()]);

    try {
        const commandString = sanitizeCommand(rawCommandString);
        const buildResult = buildCommandFromString(commandString, { ignoreUnsupportedArguments: true });
        if (!buildResult.successfull) {
            return { successfull: false, message: 'Invalid command' };
        }

        const stringifiedArguments = strinfigyCurlCommand(
            applyAdditionalOptions(buildResult.curlCommand, outputFileName, headersFileName),
        );
        const { stdout, stderr } = await execAsync('curl ' + stringifiedArguments);
        if (stderr) {
            return { successfull: false, message: stderr };
        }

        const metadata = JSON.parse(stdout) as { code: number; ip: string };
        const outputBuffer = await readFileAsync(outputFileName);
        const headersBuffer = await readFileAsync(headersFileName);
        const headers = headersBuffer
            .toString()
            .split('\r\n')
            .filter((header) => header.length > 0);

        return { successfull: true, headers, body: outputBuffer.toString(), ...metadata };
    } catch (e) {
        const [firstLine, ...restLines] = e.message.split('\n') as string[];
        return { successfull: false, message: restLines.length > 0 ? restLines.join('. ') : firstLine };
    } finally {
        if (fs.existsSync(outputFileName)) {
            fs.unlinkSync(outputFileName);
        }
        if (fs.existsSync(headersFileName)) {
            fs.unlinkSync(headersFileName);
        }
    }
}

function applyAdditionalOptions(command: CurlCommand, bodyFileName: string, headersFileName: string) {
    const combinedApplier = combineApplierFunctions(
        silentApplier.applyTo,
        showErrorApplier.applyTo,
        bindPayloadToApplierFunction(writeOutApplier.applyTo, [
            `{\\"code\\": %{http_code}, \\"ip\\": \\"%{remote_ip}\\"}`,
        ]),
        bindPayloadToApplierFunction(outputApplier.applyTo, [bodyFileName]),
        bindPayloadToApplierFunction(dumpHeaderApplier.applyTo, [headersFileName]),
    );

    return combinedApplier(command);
}

async function getTempFileNameAsync() {
    return new Promise<string>((resolve, reject) => {
        tmp.tmpName((err, path) => {
            err ? reject(err) : resolve(path);
        });
    });
}
