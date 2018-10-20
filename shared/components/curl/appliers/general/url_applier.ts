import { url } from '../../arguments';
import { ArgumentApplier } from '../applier';
import { buildArgumentInserter, buildSimpleDetector } from '../utils';

const urlApplier: ArgumentApplier = {
    argument: url,
    applyTo: buildArgumentInserter(url),
    isAppliedTo: buildSimpleDetector(url),
    incompatibleArguments: [],
};

export default urlApplier;
