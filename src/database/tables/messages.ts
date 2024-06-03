import { IMessagesModel } from '#src/types/messages.type';
import { DataTypes } from 'sequelize';
import DataBase from '../db';

const Messages = DataBase.getInstance()
  .getConnection()
  .define<IMessagesModel>('messages',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['sent', 'read']]
        }
      }
    },
    {
      timestamps: true
    }
  );

export default Messages;