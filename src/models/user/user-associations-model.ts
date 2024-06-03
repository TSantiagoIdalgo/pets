import { IUserAssociationsModel } from '#src/types/user-model/user-associations-model.type';
import ApplicationSheet from '#src/database/tables/application-sheet';
import Advertisement from '#src/database/tables/advertisement';
import Animal from '#src/database/tables/animal';
import User from '#src/database/tables/user';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';
import { IUser, IUserModel } from '#src/types/user.type';
import { IApplicationSheet } from '#src/types/application-sheet.type';
import { IChat } from '#src/types/chat.type';

export default class UserAssociationsModel implements IUserAssociationsModel {

  async getUserChats(userId: string): Promise<IChat[]> {
    if (!userId) throw new ErrorHandler(400, ErrorTypes.INVALID_INPUT, {
      userId: 'userId are required'
    });
    const user = await User.findByPk(userId);
    if (!user) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return await user.getChats();
  }

  async getUserApplicationSheet(userId: string): Promise<IApplicationSheet> {
    const sheet = await ApplicationSheet.findOne({ where: { user_id: userId } });
    if (!sheet) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return sheet;
  }

  async getUserAdvertisements(userId: string): Promise<IUserModel> {
    const advertisements = await User.findOne({
      where: { id: userId },
      include: [Advertisement]
    });
    if (!advertisements) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);

    return advertisements;
  }

  async getUserAnimals(userId: string): Promise<IUser> {
    const userAnimals = await User.findOne({
      where: { id: userId },
      include: [Animal]
    });
    if (!userAnimals) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
    return userAnimals;
  }
  
}