import UserQueryModel from '#src/models/user/user-query-model';
import ErrorHandler from '#src/helpers/error-handler';
import { RequestExtended } from '#src/types/types.type';
import { Request, Response, NextFunction } from 'express';
import { CookieToken } from '#src/types/types.type';
import { ErrorTypes } from '#src/types/errors.type';
import { 
  ILogin, 
  IUserQueryController } 
  from '#src/types/user-controller/user-query-controller.type';


export default class UserQueryController implements IUserQueryController {
  private readonly queryModel: UserQueryModel;

  constructor(queryModel: UserQueryModel) {
    this.queryModel = queryModel;
  }
  public async getAllUsers (_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.queryModel.getUsers();
      if (users.length === 0) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public async getUserById (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.queryModel.getUser(id);

      if (user === null) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
      res.status(200).json(user.dataValues);
    } catch (error) {
      next(error);
    }
  };

  public async getUserLogin (req: RequestExtended<ILogin>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const token = await this.queryModel.getLogin(email, password);
      res.cookie(CookieToken, token);
      res.redirect(302, '/');
    } catch (error) {
      next(error);
    }
  };

  public async getUserNetworkLogin (req: RequestExtended<ILogin>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, name } = req.body;
      if (!email || !name) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const token = await this.queryModel.getNetworkLogin(name, email);
      res.cookie(CookieToken, token);
      res.redirect(302, '/');
    } catch (error) {
      next(error);
    }
  };

}