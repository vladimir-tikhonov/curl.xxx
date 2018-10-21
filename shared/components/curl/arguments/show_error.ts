import Argument from './argument';
import ArgumentName from './argument_name';

const showError: Argument = {
    isSupported: false,
    name: ArgumentName.ShowError,
    flags: ['--show-error', '-S'],
    argsCount: 0,
};

export default showError;
