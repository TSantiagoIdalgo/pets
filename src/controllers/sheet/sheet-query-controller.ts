import { ISheetQueryController } from '#src/types/application-sheet-controller/sheet-query-controller.type';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';
import SheetQueryModel from '#src/models/applicationSheet/sheet-query-model';
import { RequestExtended } from '#src/types/types.type';
import { Response, NextFunction } from 'express';

export default class SheetQueryController implements ISheetQueryController {
  private readonly sheetQuery: SheetQueryModel;

  constructor(sheetQuery: SheetQueryModel) {
    this.sheetQuery = sheetQuery;
  }

  async getApplications(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const applications = await this.sheetQuery.getApplications();
      res.status(200).json(applications);
    } catch (error) {
      next(error);
    }
  }

  async getApplication(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const application = await this.sheetQuery.getApplication(id);
      res.status(200).json(application);
    } catch (error) {
      next(error);
    }
  }

  async getAppliedUsers(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const users = await this.sheetQuery.getAppliedUsers(id);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}