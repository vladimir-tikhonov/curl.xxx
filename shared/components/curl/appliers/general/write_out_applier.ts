import { writeOut } from '../../arguments';
import { ArgumentApplier } from '../applier';
import { buildArgumentInserter, buildSimpleDetector } from '../utils';

const writeOutApplier: ArgumentApplier = {
    argument: writeOut,
    applyTo: buildArgumentInserter(writeOut),
    isAppliedTo: buildSimpleDetector(writeOut),
    incompatibleArguments: [],
};

export default writeOutApplier;
