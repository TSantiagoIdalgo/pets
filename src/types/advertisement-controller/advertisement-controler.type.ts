import { NextFunction, Response } from 'express';
import { RequestExtended } from '../types.type';

export interface IAdvertisementQueryController {
  getAllAdvertisement(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>
  getAdvertisementById(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>
} 