import { IAdvertisement } from '../advertisement.type';

export interface IAdvertisementCommandModel {
  createAdvertisement(userId: string, advertisement: IAdvertisement): Promise<IAdvertisement>;
  updateAdvertisement(userId: string, advertisement: IAdvertisement): Promise<IAdvertisement>;
  deleteAdvertisement(userId: string, advertisementId: string): Promise<IAdvertisement>;
}