import { output } from '../../arguments';
import { ArgumentApplier } from '../applier';
import { buildArgumentInserter, buildSimpleDetector } from '../utils';

const outputApplier: ArgumentApplier = {
    argument: output,
    applyTo: buildArgumentInserter(output),
    isAppliedTo: buildSimpleDetector(output),
    incompatibleArguments: [],
};

export default outputApplier;
