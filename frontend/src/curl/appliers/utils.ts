import isEqual from 'lodash/isEqual';
import maxBy from 'lodash/maxBy';

import { Argument } from '../arguments';
import { CurlCommand } from '../curl_command';
import { ApplierChecher, ApplierFunction } from './applier';

export function buildArgumentsRemover(argumentsList: Argument[]): ApplierFunction {
    return (curlCommand: CurlCommand) => {
        return curlCommand.filter((argumentPayload) => argumentsList.indexOf(argumentPayload.argument) === -1);
    };
}

export function buildArgumentInserter<T extends string>(argument: Argument<T>, payload?: T[]) {
    return (curlCommand: CurlCommand, args: T[] = []) => {
        const matchedArgumentIndex = curlCommand.findIndex((argumentPayload) => argumentPayload.argument === argument);
        if (matchedArgumentIndex === -1) {
            return [...curlCommand, { argument, invokedWith: argument.flags[0], payload: payload || args }];
        }

        return curlCommand.map((argumentPayload) => {
            if (argumentPayload.argument !== argument) {
                return argumentPayload;
            }

            return { ...argumentPayload, payload: args! };
        });
    };
}

export function buildArgumentTransformer<T extends string>(argument: Argument<T>, payload: T[]): ApplierFunction {
    return (curlCommand: CurlCommand) => {
        return curlCommand.map((argumentPayload) => {
            if (argumentPayload.argument !== argument) {
                return argumentPayload;
            }

            return { ...argumentPayload, payload };
        });
    };
}

export function buildSimpleDetector<T extends string>(argument: Argument<T>): ApplierChecher<T> {
    return (curlCommand: CurlCommand) => {
        const matchedArgumentIndex = curlCommand.findIndex((argumentPayload) => argumentPayload.argument === argument);

        if (matchedArgumentIndex === -1) {
            return { isApplied: false };
        }

        return {
            isApplied: true,
            priority: matchedArgumentIndex,
            payload: curlCommand[matchedArgumentIndex].payload as T[],
        };
    };
}

export function buildSimplePayloadDetector<T extends string>(argument: Argument<T>, payload: T[]): ApplierChecher<T> {
    return (curlCommand: CurlCommand) => {
        const matchedArgumentIndex = curlCommand.findIndex(
            (argumentPayload) => argumentPayload.argument === argument && isEqual(argumentPayload.payload, payload),
        );

        if (matchedArgumentIndex === -1) {
            return { isApplied: false };
        }

        return { isApplied: true, priority: matchedArgumentIndex, payload };
    };
}

export function combineApplierFunctions(...applierFunctions: ApplierFunction[]): ApplierFunction {
    return (curlCommand: CurlCommand, args?: any[]) => {
        return applierFunctions.reduce((newCurlCommand, applierFunction) => {
            return applierFunction(newCurlCommand, args);
        }, curlCommand);
    };
}

export function combineApplierCheckers<T extends string>(
    ...applierCheckers: Array<ApplierChecher<T>>
): ApplierChecher<T> {
    return (curlCommand: CurlCommand) => {
        const filteredResults = applierCheckers
            .map((applierChecker) => applierChecker(curlCommand))
            .filter((result) => result.isApplied);

        return maxBy(filteredResults, 'priority') || { isApplied: false };
    };
}

export function overrideCheckerPayload<T extends string>(checker: ApplierChecher, newPayload: T[]): ApplierChecher<T> {
    return (curlCommand: CurlCommand) => {
        const results = checker(curlCommand);
        if (!results.isApplied) {
            return results;
        }

        return { ...results, payload: newPayload };
    };
}
