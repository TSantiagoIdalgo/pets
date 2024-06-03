import { IUserAssociationsController } from '#src/types/user-controller/user-assocations-controller.type';
import UserAssociationsModel from '#src/models/user/user-associations-model';
import ErrorHandler from '#src/helpers/error-handler';
import { RequestExtended } from '#src/types/types.type';
import { Response, NextFunction } from 'express';
import { ErrorTypes } from '#src/types/errors.type';

export default class UserAssociationsController implements IUserAssociationsController {
  private readonly associations: UserAssociationsModel;

  constructor(associations: UserAssociationsModel) {
    this.associations = associations;
  }

  async getUserChats(req: RequestExtended<null>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);
      const chats = await this.associations.getUserChats(req.userId);
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }
  
  async getUserApplicationSheet(req: RequestExtended<null>, res: Response, next: NextFunction) {
    try {
      if (!req.userId) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);
      const applicationSheet = await this.associations.getUserApplicationSheet(req.userId);
      res.status(200).json(applicationSheet);
    } catch (error) {
      next(error);
    }
  }

  async getUserAdvertisements(req: RequestExtended<null>, res: Response, next: NextFunction) {
    try {
      if (!req.userId) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);
      const advertisements = await this.associations.getUserAdvertisements(req.userId);
      res.status(200).json(advertisements);
    } catch (error) {
      next(error);
    }
  }

  async getUserAnimals(req: RequestExtended<null>, res: Response, next: NextFunction) {
    try {
      if (!req.userId) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);
      const animals = await this.associations.getUserAnimals(req.userId);
      res.status(200).json(animals);
    } catch (error) {
      next(error);
    }
  }

}