import { IUser } from '../user.type';
import { Response, NextFunction } from 'express';
import { RequestExtended } from '../types.type';

export interface IUpdateUser {
    user: Partial<IUser>;
}

export interface IUserCommandController {
    createUser(req: RequestExtended<IUser>, res: Response, next: NextFunction): Promise<void>;
    updateUser(req: RequestExtended<IUpdateUser>, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: RequestExtended<IUser>, res: Response, next: NextFunction): Promise<void>;
}