import Subject from '#src/types/subject.abstract';
import Chat from '#src/database/tables/chat';
import ErrorHandler from '#src/helpers/error-handler';
import { WebSocket, RawData } from 'ws';
import { ErrorTypes } from '#src/types/errors.type';
import Messages from '#src/database/tables/messages';

export default class ChatWsModel extends Subject {
  public attachUser (userId: string, ws: WebSocket) {
    this.clients.set(userId, ws);
  }

  public detachUser (userId: string) {
    this.clients.delete(userId);
  }

  override notify(message: RawData): void {
    super.notify(message);
  }

  public async getChatMessages (chatId: string) {
    try {
      if (!chatId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      const chat = await Chat.findOne({
        where: { chat_id: chatId },
        include: [Messages]
      });
      return chat;
    } catch (error) {
      if (error instanceof ErrorHandler) throw error;
      else if (error instanceof Error) {
        throw new ErrorHandler(500, error.message);
      } else throw new ErrorHandler(500, ErrorTypes.INTERNAL_ERROR);
    }
  }
}