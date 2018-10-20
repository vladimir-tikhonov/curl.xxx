import Argument from './argument';
import ArgumentName from './argument_name';

const url: Argument = {
    isSupported: true,
    name: ArgumentName.Url,
    flags: ['url'],
    argsCount: 1,
};

export default url;
