import Argument from './argument';
import ArgumentName from './argument_name';

const dumpHeader: Argument = {
    isSupported: false,
    name: ArgumentName.DumpHeader,
    flags: ['--dump-header', '-D'],
    argsCount: 1,
};

export default dumpHeader;
