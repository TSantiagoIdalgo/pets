import { Model } from 'sequelize';
import { IChat } from './chat.type';
import { BelongsToManyGetAssociationsMixin, 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';

type Role = 'adopter' | 'rescuer';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface IUserModel extends Model, IUser {
    createdAt: Date;
    updatedAt: Date;
    getChats: BelongsToManyGetAssociationsMixin<IChat>;
    addChat: BelongsToManyAddAssociationMixin<IChat, 'chats'>;
    removeChat: BelongsToManyRemoveAssociationMixin<IChat, 'chats'>;
}