import { RequestExtended } from '#src/types/types.type';
import { Response, NextFunction } from 'express';
import { CookieToken } from '#src/types/types.type';
import { SECRET } from '#src/config/config';
import { IUser } from '#src/types/user.type';
import jwt from 'jsonwebtoken';

export default function TokenVerify (req: RequestExtended<[]>, _res: Response, next: NextFunction) {
  if (req.cookies && req.cookies[CookieToken]) {
    const cookie = req.cookies[CookieToken] as string;
    if (!cookie) return next();
    const token = req.cookies[CookieToken] as string;
    if(!token.toLowerCase().startsWith('bearer ')) return next();
    try {
      const decoded = jwt.verify(token.slice(7), SECRET) as IUser;
      req.userId = decoded.email;
    } catch (error) {
      return next();
    }

  }
  next();
}