import { Request, Response, NextFunction } from 'express';
import { RequestExtended } from '../types.type';

export interface ILogin {
    name: string;
    email: string;
    password: string;
    image?: string;
}

export interface IUserQueryController {
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserLogin(req: RequestExtended<ILogin>, res: Response, next: NextFunction): Promise<void>;
    getUserNetworkLogin(req: RequestExtended<ILogin>, res: Response, next: NextFunction): Promise<void>;
}