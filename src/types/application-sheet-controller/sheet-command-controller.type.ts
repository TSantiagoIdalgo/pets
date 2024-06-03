import { Response, NextFunction } from 'express';
import { RequestExtended } from '../types.type';
import { IApplicationSheet } from '../application-sheet.type';

export interface ISheetCommandController {
  createSheet(req: RequestExtended<IApplicationSheet>, res: Response, next: NextFunction): Promise<void>
  updateSheet(req: RequestExtended<IApplicationSheet>, res: Response, next: NextFunction): Promise<void>
  deleteSheet(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void>
}