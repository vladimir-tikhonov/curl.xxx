import { allRequestMethods, RequestMethod } from '../request_methods';
import Argument from './argument';
import ArgumentName from './argument_name';

const request: Argument<RequestMethod> = {
    isSupported: true,
    name: ArgumentName.Request,
    flags: ['--request', '-X'],
    argsCount: 1,
    validValues: allRequestMethods,
};

export default request;
