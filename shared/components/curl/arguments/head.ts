import Argument from './argument';
import ArgumentName from './argument_name';

const head: Argument = {
    isSupported: true,
    name: ArgumentName.Head,
    flags: ['--head', '-I'],
    argsCount: 0,
};

export default head;
