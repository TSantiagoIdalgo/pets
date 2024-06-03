import User from '#src/database/tables/user';
import jwt from 'jsonwebtoken';
import ErrorHandler from '#src/helpers/error-handler';
import bcrypt from 'bcryptjs';
import { IUser, IUserModel } from '#src/types/user.type';
import { IUserQueryModel } from '#src/types/user-model/user-query-model.type';
import { ErrorTypes } from '#src/types/errors.type';
import { SECRET } from '#src/config/config';

export default class UserQueryModel implements IUserQueryModel {
  async getUsers(): Promise<IUser[]> {
    return await User.findAll();
  }
  async getUser(userId: string): Promise<IUserModel | null> {
    return await User.findByPk(userId) || null;
  }
  
  async getLogin(userId: string, password: string): Promise<string> {
    const user = await this.getUser(userId);
    if (!user) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    const passwordMatch = !password 
      ? false
      : await bcrypt.compare(password, user.password) ;
    if (!passwordMatch) throw new ErrorHandler(401, ErrorTypes.UNAUTHORIZED);

    const payload = { userId: user.email }; 

    const token = jwt.sign(payload, SECRET);
    return token;
  }

  async getNetworkLogin(name: string, userId: string): Promise<string> {
    let user = await this.getUser(userId);
    if (!user) {
      const password = crypto.randomUUID();
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      user = await User.create({ name, email: userId, password: passwordHash });
    }
    
    return jwt.sign({ userId: user.email }, SECRET);
  }
}