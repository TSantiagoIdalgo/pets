import { Model } from 'sequelize';
import { IMessages } from './messages.type';
import { IUser } from './user.type';
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';

export interface Chat {
    chat_id: string;
    title: string;
    usersInChat: string[];
}
export const pablo = 32;

export interface IChat extends Model, Chat {
    addUser: BelongsToManyAddAssociationMixin<IUser, 'users'>
    getUsers: BelongsToManyGetAssociationsMixin<IUser>
    removeUser: BelongsToManyRemoveAssociationMixin<IUser, 'users'>
}

export interface IChatMessage extends Chat {
    message: IMessages;
}