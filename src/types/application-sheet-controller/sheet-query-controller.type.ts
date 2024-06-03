
import { RequestExtended } from '../types.type';
import { Response, NextFunction } from 'express';

export interface ISheetQueryController {
  getApplications(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
  getApplication(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
  getAppliedUsers(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>;
}