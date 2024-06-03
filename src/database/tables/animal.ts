import DataBase from '../db';
import { IAnimalModel } from '#src/types/animal.type';
import { DataTypes } from 'sequelize';

const Animal = DataBase.getInstance()
  .getConnection()
  .define<IAnimalModel>('animal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    species: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healhtStatus: {
      type: DataTypes.STRING(20)
    },
    status: {
      type: DataTypes.STRING(15),
      defaultValue: 'not adopted',
      validate: {
        isIn: [['not adopted', 'in progress', 'adopted']]
      }
    }
  });

export default Animal;