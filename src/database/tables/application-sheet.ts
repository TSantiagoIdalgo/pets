import DataBase from '../db';
import { IApplicationSheetModel } from '#src/types/application-sheet.type';
import { DataTypes } from 'sequelize';

const ApplicationSheet = DataBase.getInstance()
  .getConnection()
  .define<IApplicationSheetModel>('applicationsheet', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    location: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    home_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    reasons_for_adopting: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    home_visit_agreement: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    preferred_gender: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  });

export default ApplicationSheet;