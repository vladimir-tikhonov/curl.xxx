import { CurlCommand } from '../../curl_command';
import { RequestMethod } from '../../request_methods';
import { ArgumentApplier } from '../applier';
import { combineApplierCheckers } from '../utils';

import getApplier from './get_applier';
import headApplier from './head_applier';

const requestToApplierMapping: Record<RequestMethod, ArgumentApplier<RequestMethod>> = {
    [RequestMethod.Get]: getApplier,
    [RequestMethod.Head]: headApplier,
};

export function getRequestMethod(curlCommand: CurlCommand): RequestMethod {
    const checker = combineApplierCheckers(getApplier.isAppliedTo, headApplier.isAppliedTo);
    const results = checker(curlCommand);
    if (!results.isApplied) {
        return RequestMethod.Get;
    }

    return results.payload[0];
}

export function applyRequestMethod(curlCommand: CurlCommand, requestMethod: RequestMethod) {
    const applier = requestToApplierMapping[requestMethod];
    return applier.applyTo(curlCommand);
}
