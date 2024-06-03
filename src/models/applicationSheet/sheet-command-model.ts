import ApplicationSheet from '#src/database/tables/application-sheet';
import ErrorHandler from '#src/helpers/error-handler';
import { ISheetCommandModel } from '#src/types/application-sheet-model/sheet-command-model';
import { IApplicationSheet, IApplicationSheetModel } from '#src/types/application-sheet.type';
import { ErrorTypes } from '#src/types/errors.type';

export default class SheetCommandModel implements ISheetCommandModel {
  async createSheet(userId: string, application: IApplicationSheet): Promise<IApplicationSheetModel> {
    const sheet = await ApplicationSheet.findOne({ where: { user_id: userId } });
    if (sheet) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
    const newSheet = await ApplicationSheet.create({ ...application, user_id: userId });
    return newSheet; 
  }

  async updateSheet(userId: string, application: Partial<IApplicationSheet>): Promise<IApplicationSheetModel> {
    const sheet = await ApplicationSheet.findOne({ where: { user_id: userId } });
    if (!sheet) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);

    sheet.set(application);
    await sheet.save();

    return sheet;
  }
  
  async deleteSheet(userId: string): Promise<IApplicationSheetModel> {
    const sheet = await ApplicationSheet.findOne({ where: { user_id: userId } });
    if (!sheet) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
    await ApplicationSheet.destroy({ where: { user_id: userId } });

    return sheet;
  }

}
    
