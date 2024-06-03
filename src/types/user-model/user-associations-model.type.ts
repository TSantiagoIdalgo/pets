import { IChat } from '../chat.type';
import { IApplicationSheet } from '../application-sheet.type';
import { IUser, IUserModel } from '../user.type';

export interface IUserAssociationsModel {
    getUserChats(userId: string): Promise<IChat[]>;
    getUserApplicationSheet(userId: string): Promise<IApplicationSheet>;
    getUserAdvertisements(userId: string): Promise<IUserModel>;
    getUserAnimals(userId: string): Promise<IUser>;
}