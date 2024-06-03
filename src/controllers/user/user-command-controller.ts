import { IUpdateUser, IUserCommandController } from '#src/types/user-controller/user-command-controller.type';
import UserCommandModel from '#src/models/user/user-command-model';
import { RequestExtended } from '#src/types/types.type';
import { IUser } from '#src/types/user.type';
import { Response, NextFunction } from 'express';
import ErrorHandler from '#src/helpers/error-handler';

export default class UserCommandController implements IUserCommandController {
  private readonly userCommnad: UserCommandModel;

  constructor (userCommand: UserCommandModel) {
    this.userCommnad = userCommand;
  }

  async createUser(req: RequestExtended<IUser>, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body as IUser;
      const createdUser = await this.userCommnad.create(user);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: RequestExtended<IUpdateUser>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, 'NOT_FOUND');
      const user = req.body;
      const updatedUser = await this.userCommnad.update(req.userId, user.user);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: RequestExtended<IUser>, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) throw new ErrorHandler(400, 'NOT_FOUND');
      const deletedUser = await this.userCommnad.delete(req.userId);
      res.status(200).json(deletedUser);
    } catch (error) {
      next(error);
    }
  }
}