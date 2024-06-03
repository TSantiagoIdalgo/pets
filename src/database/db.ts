import { Sequelize } from 'sequelize';
import { DB_URI, DB_URI_TEST, NODE_ENV } from '#src/config/config';

export default class DataBase {
  private static instance: DataBase;
  private connection: Sequelize;

  constructor() {
    this.connection = new Sequelize(`${NODE_ENV === 'test' ? DB_URI_TEST : DB_URI}`, {
      logging: false,
    });
  }

  static getInstance() {
    if (!this.instance) this.instance = new DataBase();
    return this.instance;
  }

  public getConnection() {
    return this.connection;
  }
}