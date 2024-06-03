import { Model } from 'sequelize';

export interface IAdvertisement {
  id?: string;
  title: string;
  text: string;
  user_id: string;
}

export interface IAdvertisementModel extends Model, IAdvertisement {
    createdAt: Date;
    updatedAt: Date;
}