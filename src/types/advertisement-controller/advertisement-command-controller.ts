import { RequestExtended } from '../types.type';
import { Response, NextFunction } from 'express';
import { IAdvertisement } from '../advertisement.type';

export interface IAdvertisementCommandController {
  createAdvertisement(req: RequestExtended<IAdvertisement>, res: Response, next: NextFunction): Promise<void>;
  updateAdvertisement(req: RequestExtended<IAdvertisement>, res: Response, next: NextFunction): Promise<void>;
  deleteAdvertisement(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
}