import { IUser } from '../user.type';

export interface IUserQueryModel {
    getUsers(): Promise<IUser[]>;
    getUser(userId: string): Promise<IUser | null>;
    getLogin(userId: string, password: string): Promise<string>;
    getNetworkLogin(userId: string, password: string, image: string): Promise<string>;
}