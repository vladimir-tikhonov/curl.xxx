import Argument from './argument';
import ArgumentName from './argument_name';

const silent: Argument = {
    isSupported: false,
    name: ArgumentName.Silent,
    flags: ['--silent', '-s'],
    argsCount: 0,
};

export default silent;
