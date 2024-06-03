import { IAdvertisement } from '../advertisement.type';

export interface IAdvertisementQueryModel {
  getAdvertisement(): Promise<IAdvertisement[]>;
  getAdvertisementById(id: string): Promise<IAdvertisement>;
}