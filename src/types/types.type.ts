import { Request } from 'express';

export interface RequestExtended<T> extends Request { 
    body: T,
    userId?: string;
}
export const CookieToken = 'XSRF-TOKEN';
