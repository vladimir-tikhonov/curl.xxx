import uniq from 'lodash/uniq';

import { Argument, isPositional } from './arguments';
import parse, { ParseResults } from './parser';

export interface ArgumentPayload<T extends string = string> {
    argument: Argument<T>;
    invokedWith: string;
    payload: T[];
}

export type CurlCommand = ArgumentPayload[];
export type BuildResults =
    | { successfull: true; curlCommand: CurlCommand; warnings: string[] }
    | { successfull: false; error: string };

const SANITIZE_REGEX = /^(\s*\$\s*)?(\s*curl\s*)?(.*)/;

export function buildCommandFromString(command: string): BuildResults {
    const parseResults = parse(command);
    if (!parseResults.successfull) {
        return { successfull: false, error: parseResults.error };
    }

    const unsupportedArguments = parseResults.payloads.filter((payload) => !payload.argument.isSupported);
    return {
        successfull: true,
        curlCommand: parseResults.payloads,
        warnings: [
            ...buildUnknownArgumentsWarnings(parseResults),
            ...buildUnsupportedAgrumentsWarnings(unsupportedArguments),
        ],
    };
}

export function strinfigyCurlCommand(curlCommand: CurlCommand) {
    return curlCommand
        .map((argumentPayload) => {
            return isPositional(argumentPayload.argument)
                ? argumentPayload.payload.join(' ')
                : `${argumentPayload.invokedWith} ${argumentPayload.payload.join(' ')}`;
        })
        .join(' ');
}

export function sanitizeCommand(command: string) {
    const matches = command.match(SANITIZE_REGEX)!;
    return matches[matches.length - 1];
}

function buildUnsupportedAgrumentsWarnings(unsupportedArguments: ArgumentPayload[]) {
    return unsupportedArguments.map(({ argument, invokedWith, payload }) => {
        return `${argument.name} flag is not supported and will be ignored: ${invokedWith} ${payload.join(' ')}`;
    });
}

function buildUnknownArgumentsWarnings(parseResults: ParseResults) {
    if (!parseResults.successfull) {
        return [];
    }

    if (parseResults.unknownArguments.length === 0) {
        return [];
    }

    const result: string[] = [];
    const unprocessedUnknownArguments = [...parseResults.unknownArguments];
    while (unprocessedUnknownArguments.length > 0) {
        const currentUnprocessedArgument = unprocessedUnknownArguments.shift()!;
        if (!isFlag(currentUnprocessedArgument)) {
            result.push(
                `argument "${currentUnprocessedArgument}" will be ignored - you can make only one request at a time`,
            );
            continue;
        }

        const nextUnprocessedArgument = unprocessedUnknownArguments[0];
        const nextArgumentIsPositional = !!nextUnprocessedArgument && !isFlag(nextUnprocessedArgument);
        const isInGroupWithNextArgument =
            !!nextUnprocessedArgument &&
            parseResults.unknownArguments.indexOf(currentUnprocessedArgument) + 1 ===
                parseResults.unknownArguments.indexOf(nextUnprocessedArgument);
        const shouldCombineWithNextArgument = nextArgumentIsPositional && isInGroupWithNextArgument;
        if (shouldCombineWithNextArgument) {
            unprocessedUnknownArguments.shift();
        }

        const argument = shouldCombineWithNextArgument
            ? currentUnprocessedArgument + ' ' + nextUnprocessedArgument
            : currentUnprocessedArgument;
        result.push(`unknown flag will be ignored: ${argument}`);
    }

    return uniq(result);
}

function isFlag(argumentName: string) {
    return argumentName.startsWith('-');
}
