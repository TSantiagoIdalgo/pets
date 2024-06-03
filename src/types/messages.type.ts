import { Model } from 'sequelize';

type Status = 'sent' | 'read'
type Type = 'connect' | 'message'

export interface IMessages {
    message: string;
    status: Status;
    type: Type;
    user_id: string;
    chat_id: string;
}

export interface IMessagesModel extends Model, IMessages {
    createdAt: Date;
    updatedAt: Date;
}