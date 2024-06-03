import { ISheetCommandController } from '#src/types/application-sheet-controller/sheet-command-controller.type';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';
import SheetCommandModel from '#src/models/applicationSheet/sheet-command-model';
import { IApplicationSheet } from '#src/types/application-sheet.type';
import { RequestExtended } from '#src/types/types.type';
import { Response, NextFunction } from 'express';
import { sheetSchema } from '#src/helpers/validates/sheet-schema';

export default class SheetCommandController implements ISheetCommandController {
  private readonly sheetCommandModel: SheetCommandModel;

  constructor(sheetCommandModel: SheetCommandModel) {
    this.sheetCommandModel = sheetCommandModel;
  }
  async createSheet(req: RequestExtended<IApplicationSheet>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);
      const sheetParsed = sheetSchema.safeParse(req.body);
      if (!sheetParsed.success) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const sheet = await this.sheetCommandModel.createSheet(req.userId, sheetParsed.data);
      res.status(201).json(sheet);
    } catch (error) {
      next(error);
    }
  }

  async updateSheet(req: RequestExtended<IApplicationSheet>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);
      const optionalSchema = sheetSchema.partial();
      const sheetParsed = optionalSchema.safeParse(req.body);
      if (!sheetParsed.success) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const sheet = await this.sheetCommandModel.updateSheet(req.userId, sheetParsed.data);
      res.status(200).json(sheet);
    } catch (error) {
      next(error);
    }
  }

  async deleteSheet(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);
      const sheet = await this.sheetCommandModel.deleteSheet(req.userId);
      res.status(200).json(sheet);
    } catch (error) {
      next(error);
    }
  }
}