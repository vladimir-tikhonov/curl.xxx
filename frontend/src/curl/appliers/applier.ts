import { Argument } from '../arguments';
import { CurlCommand } from '../curl_command';

export type ApplierFunction = (curlCommand: CurlCommand, args?: any[]) => CurlCommand;
export type ApplierChecher<T extends string = string> = (
    curlCommand: CurlCommand,
) => { isApplied: true; priority: number; payload: T[] } | { isApplied: false };

export type ArgumentApplier<T extends string = string> = Readonly<{
    argument: Argument<T>;
    applyTo: ApplierFunction;
    isAppliedTo: ApplierChecher<T>;
    incompatibleArguments: Argument[];
}>;
