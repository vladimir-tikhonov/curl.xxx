import { head, request } from '../../arguments';
import { RequestMethod } from '../../request_methods';
import { ArgumentApplier } from '../applier';
import {
    buildArgumentInserter,
    buildArgumentsRemover,
    buildSimpleDetector,
    buildSimplePayloadDetector,
    combineApplierCheckers,
    combineApplierFunctions,
    overrideCheckerPayload,
} from '../utils';

const headApplier: ArgumentApplier<RequestMethod> = {
    argument: request,
    applyTo: combineApplierFunctions(buildArgumentsRemover([request]), buildArgumentInserter(head)),
    isAppliedTo: overrideCheckerPayload(
        combineApplierCheckers(buildSimplePayloadDetector(request, [RequestMethod.Head]), buildSimpleDetector(head)),
        [RequestMethod.Head],
    ),
    incompatibleArguments: [],
};

export default headApplier;
