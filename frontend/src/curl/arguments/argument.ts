import ArgumentName from './argument_name';

type Argument<T = any> = Readonly<{
    isSupported: boolean;
    name: ArgumentName;
    flags: string[];
    argsCount: number;
    validValues?: T[];
}>;

export default Argument;
