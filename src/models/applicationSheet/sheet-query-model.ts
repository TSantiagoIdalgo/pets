import ErrorHandler from '#src/helpers/error-handler';
import ApplicationSheet from '#src/database/tables/application-sheet';
import { ErrorTypes } from '#src/types/errors.type';
import { ISheetQueryModel } from '#src/types/application-sheet-model/Sheet-query-model.type';
import { IApplicationSheet } from '#src/types/application-sheet.type';
import { IUser } from '#src/types/user.type';
import User from '#src/database/tables/user';

export default class SheetQueryModel implements ISheetQueryModel {
  async getAppliedUsers(id: string): Promise<IUser[]> {
    const applications = await User.findAll({
      include: [{
        model: ApplicationSheet,
        where: { id },
        required: true
      }]
    });
    if (applications.length === 0) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return applications;
  }

  async getApplications(): Promise<IApplicationSheet[]> {
    const applications = await ApplicationSheet.findAll();
    if (applications.length === 0) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return applications;
  }

  async getApplication(id: string): Promise<IApplicationSheet> {
    const application = await ApplicationSheet.findByPk(id);
    if (!application) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return application;
  }
  
}