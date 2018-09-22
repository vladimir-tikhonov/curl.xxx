import { allRequestMethods, RequestMethod } from 'src/request_methods';
import Argument from './argument';
import ArgumentName from './argument_name';

const request: Argument<RequestMethod> = {
    isSupported: true,
    name: ArgumentName.Request,
    flags: ['-X', '--request'],
    argsCount: 1,
    validValues: allRequestMethods,
};

export default request;
