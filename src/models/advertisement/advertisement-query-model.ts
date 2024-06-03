import { IAdvertisementQueryModel } from '#src/types/advertisement/advertisement-query-model.type';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';
import { IAdvertisement } from '#src/types/advertisement.type';
import Advertisement from '#src/database/tables/advertisement';

export default class AdvertisementQueryModel implements IAdvertisementQueryModel {
  async getAdvertisement(): Promise<IAdvertisement[]> {
    const advertisement = await Advertisement.findAll();
    if (advertisement.length === 0) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return advertisement;
  }

  async getAdvertisementById(id: string): Promise<IAdvertisement> {
    const advertisement = await Advertisement.findByPk(id);
    if (!advertisement) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return advertisement;
  }
}