import { Response, NextFunction } from 'express';
import { RequestExtended } from '../types.type';


export interface IUserAssociationsController {
    getUserChats(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
    getUserApplicationSheet(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
    getUserAdvertisements(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
    getUserAnimals(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
}