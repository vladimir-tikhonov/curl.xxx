import { ArgumentParser } from 'argparse';
import sortBy from 'lodash/sortBy';
import stringArgv from 'string-argv';

import { allArguments, Argument, ArgumentName, findArgumentByName, isPositional } from './arguments';
import { ArgumentPayload } from './curl_command';

export type ParseResults =
    | { successfull: true; payloads: ArgumentPayload[]; unknownArguments: string[]; argv: string[] }
    | { successfull: false; error: string };

type ArgparseParseResults = [Record<ArgumentName, string[] | null>, string[]];

const parser = new ArgumentParser({ addHelp: false, debug: true });
allArguments.forEach((argument) => {
    parser.addArgument(argument.flags, {
        nargs: argument.argsCount,
        choices: argument.validValues,
        dest: isPositional(argument) ? undefined : argument.name,
    });
});

export default function parse(command: string): ParseResults {
    try {
        const argv = stringArgv(command);
        if (argv.length === 0) {
            return { successfull: false, error: 'You must specify an url' };
        }

        const [knownArguments, unknownArguments] = parser.parseKnownArgs(argv) as ArgparseParseResults;
        const payloads = (Object.keys(knownArguments) as ArgumentName[])
            .filter((argumentName) => !!knownArguments[argumentName])
            .map((argumentName) => {
                const argument = findArgumentByName(argumentName);
                return {
                    argument,
                    invokedWith: findInvokation(argument, argv),
                    payload: knownArguments[argumentName]!,
                };
            });
        return { successfull: true, payloads: sortPayloads(payloads, argv), unknownArguments, argv };
    } catch (e) {
        return { successfull: false, error: e.message };
    }
}

function findInvokation(argument: Argument, argv: string[]) {
    if (isPositional(argument)) {
        return argument.flags[0];
    }

    return argv.find((usedFlag) => argument.flags.some((flag) => areFlagsEqual(usedFlag, flag)))!;
}

function areFlagsEqual(usedFlag: string, fullFlag: string) {
    if (fullFlag.startsWith('--')) {
        return fullFlag === usedFlag || fullFlag.startsWith(usedFlag);
    }

    return fullFlag === usedFlag;
}

function sortPayloads(argumentPayloads: ArgumentPayload[], argv: string[]) {
    return sortBy(argumentPayloads, (argumentPayload) => {
        if (isPositional(argumentPayload.argument)) {
            return argv.indexOf(argumentPayload.payload[0]);
        }

        return argv.lastIndexOf(argumentPayload.invokedWith);
    });
}
