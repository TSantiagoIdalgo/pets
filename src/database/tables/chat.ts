import DataBase from '../db';
import { IChat } from '#src/types/chat.type';
import { DataTypes } from 'sequelize';

const Chat = DataBase.getInstance()
  .getConnection()
  .define<IChat>('chat', {
    chat_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usersInChat: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  });

export default Chat;