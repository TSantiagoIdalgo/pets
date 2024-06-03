import ErrorHandler from '#src/helpers/error-handler';
import User from '#src/database/tables/user';
import Chat from '#src/database/tables/chat';
import DataBase from '#src/database/db';
import { ErrorTypes } from '#src/types/errors.type';
import { IChatMessage } from '#src/types/chat.type';
import { Observer } from '#src/types/observer.interface';

export default class AddUsersToChat implements Observer {
  async update(message: IChatMessage) {
    await DataBase.getInstance().getConnection()
      .transaction(async (t) => {
        let users = message.usersInChat;
        if (!users) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
        if (!Array.isArray(users)) users = [users];
        const chat = await Chat.findOne({
          where: { chat_id: message.chat_id },
          transaction: t
        });

        if (!chat) {
          const newChat = await Chat.create({ 
            chat_id: message.chat_id,
            title: message.title,
            users: users
          }, { transaction: t });

          await Promise.all(users.map(async user => {
            const userFound = await User.findOne({
              where: { user_id: user },
              transaction: t
            });
            if (!userFound) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);
            await newChat.addUser(userFound);
          }));
        }
      });
  }
}