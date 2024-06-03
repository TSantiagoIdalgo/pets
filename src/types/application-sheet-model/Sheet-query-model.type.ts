import { IApplicationSheet } from '../application-sheet.type';
import { IUser } from '../user.type';

export interface ISheetQueryModel {
  getApplications(): Promise<IApplicationSheet[]>;
  getApplication(id: string): Promise<IApplicationSheet>;
  getAppliedUsers(id: string): Promise<IUser[]>;
}