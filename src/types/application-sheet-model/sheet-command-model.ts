import { IApplicationSheet, IApplicationSheetModel } from '../application-sheet.type';

export interface ISheetCommandModel {
  createSheet(userId: string, application: IApplicationSheet): Promise<IApplicationSheetModel>
  updateSheet(userId: string, application: IApplicationSheet): Promise<IApplicationSheetModel>
  deleteSheet(userId: string): Promise<IApplicationSheetModel>
}