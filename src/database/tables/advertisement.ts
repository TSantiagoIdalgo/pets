import DataBase from '../db';
import { IAdvertisementModel } from '#src/types/advertisement.type';
import { DataTypes } from 'sequelize';

const Advertisement = DataBase.getInstance()
  .getConnection()
  .define<IAdvertisementModel>('advertisement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

export default Advertisement;