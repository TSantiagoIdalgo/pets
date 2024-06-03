import { IAdvertisementCommandModel } from '#src/types/advertisement/advertisement-command-model.type';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';
import { IAdvertisement } from '#src/types/advertisement.type';
import Advertisement from '#src/database/tables/advertisement';

export default class AdvertisementCommandModel implements IAdvertisementCommandModel {
  async createAdvertisement(userId: string, advertisement: IAdvertisement): Promise<IAdvertisement> {
    if (!userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
    const newAdvertisement = await Advertisement.create({ ...advertisement, user_id: userId });
    return newAdvertisement;
  }

  async updateAdvertisement(userId: string, advertisement: Partial<IAdvertisement>): Promise<IAdvertisement> {
    if (!userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
    const advertisementFound = await Advertisement.findOne({ where: { id: advertisement.id, user_id: userId } });
    if (!advertisementFound) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    advertisementFound.set(advertisement);
    await advertisementFound.save();

    return advertisementFound;
  }

  async deleteAdvertisement(userId: string, advertisementId: string): Promise<IAdvertisement> {
    if (!userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
    const advertisementFound = await Advertisement.findOne({ where: { id: advertisementId, user_id: userId } });
    if (!advertisementFound) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);

    await Advertisement.destroy({
      where: { id: advertisementId, user_id: userId }
    });

    return advertisementFound;
  }

}