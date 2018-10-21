import { silent } from '../../arguments';
import { ArgumentApplier } from '../applier';
import { buildArgumentInserter, buildSimpleDetector } from '../utils';

const silentApplier: ArgumentApplier = {
    argument: silent,
    applyTo: buildArgumentInserter(silent),
    isAppliedTo: buildSimpleDetector(silent),
    incompatibleArguments: [],
};

export default silentApplier;
