import Chat from '#src/database/tables/chat';
import ErrorHandler from '#src/helpers/error-handler';
import { ErrorTypes } from '#src/types/errors.type';

export default class ChatModel {
  public async getChatById (chatId: string) {
    try {
      if (!chatId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const chat = await Chat.findOne({ where: { chat_id: chatId }});
      return chat;
    } catch (error) {
      if (error instanceof ErrorHandler) throw error;
      else if (error instanceof Error) {
        throw new ErrorHandler(500, error.message);
      } else throw new ErrorHandler(500, ErrorTypes.INTERNAL_ERROR);
    }
  }
}