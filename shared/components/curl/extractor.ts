import { getRequestMethod } from './appliers/request_methods';
import { url } from './arguments';
import { CurlCommand } from './curl_command';
import { RequestMethod } from './request_methods';

export interface CurlRequestMetadata {
    requestMethod: RequestMethod;
    url: string;
}

export default function extractMetadata(curlCommand: CurlCommand): CurlRequestMetadata {
    return {
        requestMethod: getRequestMethod(curlCommand),
        url: curlCommand.find((argumentPayload) => argumentPayload.argument === url)!.payload[0],
    };
}
