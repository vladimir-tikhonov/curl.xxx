import Argument from './argument';
import ArgumentName from './argument_name';

const writeOut: Argument = {
    isSupported: false,
    name: ArgumentName.WriteOut,
    flags: ['--write-out', '-w'],
    argsCount: 1,
};

export default writeOut;
