import { dumpHeader } from '../../arguments';
import { ArgumentApplier } from '../applier';
import { buildArgumentInserter, buildSimpleDetector } from '../utils';

const dumpHeaderApplier: ArgumentApplier = {
    argument: dumpHeader,
    applyTo: buildArgumentInserter(dumpHeader),
    isAppliedTo: buildSimpleDetector(dumpHeader),
    incompatibleArguments: [],
};

export default dumpHeaderApplier;
