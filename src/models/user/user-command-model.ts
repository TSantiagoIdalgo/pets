import User from '#src/database/tables/user';
import ErrorHandler from '#src/helpers/error-handler';
import { userSchema } from '#src/helpers/validates/user-schema';
import { ErrorTypes } from '#src/types/errors.type';
import { IUserCommandModel } from '#src/types/user-model/user-command-model.type';
import { IUser, IUserModel } from '#src/types/user.type';
import UserQueryModel from './user-query-model';

export default class UserCommandModel implements IUserCommandModel {
  private readonly userQuery: UserQueryModel;

  constructor(userQuery: UserQueryModel) {
    this.userQuery = userQuery;
  }

  async create(user: IUser): Promise<IUser> {
    const userFound = await this.userQuery.getUser(user.email);
    if (userFound) throw new ErrorHandler(400, ErrorTypes.ALREADY_EXIST);
    const userParsed = userSchema.safeParse(user);
    if (!userParsed.success) throw new ErrorHandler(400, ErrorTypes.INVALID_CREDENTIALS);
    return await User.create({ ...userParsed.data });
  }

  async update(userId: string, user: Partial<IUser>): Promise<IUser> {
    const userFound = await this.userQuery.getUser(userId);
    if (!userFound) throw new ErrorHandler(400, 'NOT_FOUND');
    const userParsed = await userSchema.safeParseAsync(user);
    if (!userParsed.success) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);

    await User.update(userParsed.data, { where: { email: userId } });
    
    return userFound;
  }

  async delete(userId: string | undefined): Promise<IUserModel> {
    if (!userId) throw new ErrorHandler(400, 'NOT_FOUND');
    const user = await this.userQuery.getUser(userId);
    if (!user) throw new ErrorHandler(400, 'NOT_FOUND');
    await User.destroy({ where: { email: userId } });
    return user;
  }
}