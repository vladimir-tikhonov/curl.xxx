import { showError } from '../../arguments';
import { ArgumentApplier } from '../applier';
import { buildArgumentInserter, buildSimpleDetector } from '../utils';

const showErrorApplier: ArgumentApplier = {
    argument: showError,
    applyTo: buildArgumentInserter(showError),
    isAppliedTo: buildSimpleDetector(showError),
    incompatibleArguments: [],
};

export default showErrorApplier;
