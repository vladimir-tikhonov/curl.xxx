import allArguments from './all_arguments';
import Argument from './argument';
import ArgumentName from './argument_name';

export function isPositional(argument: Argument) {
    return argument.flags.length === 1;
}

export function findArgumentByName(argumentName: ArgumentName) {
    const argument = allArguments.find(({ name }) => name === argumentName);
    if (!argument) {
        throw new Error(`Can't find argument with name = ${argumentName}`);
    }

    return argument;
}
