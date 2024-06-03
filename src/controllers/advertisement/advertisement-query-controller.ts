import { IAdvertisementQueryController } from '#src/types/advertisement-controller/advertisement-controler.type';
import AdvertisementQueryModel from '#src/models/advertisement/advertisement-query-model';
import { RequestExtended } from '#src/types/types.type';
import { Response, NextFunction } from 'express';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';

export default class AdvertisementQueryController implements IAdvertisementQueryController {
  private readonly advertisement: AdvertisementQueryModel;
  constructor(advertisement: AdvertisementQueryModel) {
    this.advertisement = advertisement;
  }
  async getAllAdvertisement(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const advertisement = await this.advertisement.getAdvertisement();
      res.status(200).json(advertisement);
    } catch (error) {
      next(error);
    }
  }
  async getAdvertisementById(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const advertisement = await this.advertisement.getAdvertisementById(req.params.id);
      res.status(200).json(advertisement);
    } catch (error) {
      next(error);
    }
  }

  
}