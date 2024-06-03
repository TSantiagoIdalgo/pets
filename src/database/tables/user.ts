import { IUserModel } from '#src/types/user.type';
import { DataTypes } from 'sequelize';
import Database from '../db';

const User = Database.getInstance()
  .getConnection()
  .define<IUserModel>('user', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['adopter', 'rescuer']]
      }
    }
  });

export default User;