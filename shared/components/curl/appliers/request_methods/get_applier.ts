import { head, request } from '../../arguments';
import { RequestMethod } from '../../request_methods';
import { ArgumentApplier } from '../applier';
import {
    buildArgumentsRemover,
    buildArgumentTransformer,
    buildSimplePayloadDetector,
    combineApplierCheckers,
    combineApplierFunctions,
    overrideCheckerPayload,
} from '../utils';

const INCOMPATIBLE_ARGUMENTS = [head];

const getApplier: ArgumentApplier<RequestMethod> = {
    argument: request,
    applyTo: combineApplierFunctions(
        buildArgumentsRemover(INCOMPATIBLE_ARGUMENTS),
        buildArgumentTransformer(request, [RequestMethod.Get]),
    ),
    isAppliedTo: overrideCheckerPayload(
        combineApplierCheckers(
            () => ({
                isApplied: true,
                priority: -1,
                payload: [],
            }),
            buildSimplePayloadDetector(request, [RequestMethod.Get]),
        ),
        [RequestMethod.Get],
    ),
    incompatibleArguments: INCOMPATIBLE_ARGUMENTS,
};

export default getApplier;
