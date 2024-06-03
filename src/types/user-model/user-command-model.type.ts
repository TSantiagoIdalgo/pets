import { IUser, IUserModel } from '../user.type';

export interface IUserCommandModel {
    create(user: IUser): Promise<IUser>;
    update(userId: string, user: IUser): Promise<IUser>;
    delete(userId: string): Promise<IUserModel>;
}