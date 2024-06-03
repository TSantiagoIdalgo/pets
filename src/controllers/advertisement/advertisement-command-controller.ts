import { IAdvertisementCommandController } from '#src/types/advertisement-controller/advertisement-command-controller';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';
import AdvertisementCommandModel from '#src/models/advertisement/advertisement-command-model';
import { IAdvertisement } from '#src/types/advertisement.type';
import { RequestExtended } from '#src/types/types.type';
import { Response, NextFunction } from 'express';
import { advertisementSchema } from '#src/helpers/validates/advertisement-schema';

export default class AdvertisementCommandController implements IAdvertisementCommandController {
  private readonly advertisementCommand: AdvertisementCommandModel;

  constructor(advertisementCommand: AdvertisementCommandModel) {
    this.advertisementCommand = advertisementCommand;
  }

  async createAdvertisement(req: RequestExtended<IAdvertisement>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      
      const advertisementParsed = advertisementSchema.safeParse(req.body);
      if (!advertisementParsed.success) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);

      const advertisement = await this.advertisementCommand
        .createAdvertisement(req.userId, advertisementParsed.data);
      res.status(201).json(advertisement);
    } catch (error) {
      next(error);
    }
  }

  async updateAdvertisement(req: RequestExtended<IAdvertisement>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);

      const optionalAdvertisement = advertisementSchema.optional();
      const advertisementParsed = optionalAdvertisement.safeParse(req.body);
      if (!advertisementParsed.success) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      if (!advertisementParsed.data) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      
      const advertisement = await this.advertisementCommand
        .updateAdvertisement(req.userId, advertisementParsed.data);
      res.status(200).json(advertisement);
    } catch (error) {
      next(error);
    }
  }

  async deleteAdvertisement(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const { id } = req.params;
      if (!id) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const deleteAdvertisement = await this.advertisementCommand.deleteAdvertisement(req.userId, id);
      res.status(200).json(deleteAdvertisement);
    } catch (error) {
      next(error);
    }
  }


}