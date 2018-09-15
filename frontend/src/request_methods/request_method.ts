export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
    Copy = 'COPY',
    Head = 'HEAD',
    Options = 'OPTIONS',
    Link = 'LINK',
    Unlink = 'UNLINK',
    Purge = 'PURGE',
}

export const allRequestMethods = [
    RequestMethod.Get,
    RequestMethod.Post,
    RequestMethod.Put,
    RequestMethod.Patch,
    RequestMethod.Delete,
    RequestMethod.Copy,
    RequestMethod.Head,
    RequestMethod.Options,
    RequestMethod.Link,
    RequestMethod.Unlink,
    RequestMethod.Purge,
];
