import Argument from './argument';
import ArgumentName from './argument_name';

const output: Argument = {
    isSupported: false,
    name: ArgumentName.Output,
    flags: ['-o', '--output'],
    argsCount: 1,
};

export default output;
