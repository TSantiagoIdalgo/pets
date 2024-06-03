import SendMessages from '#src/services/send-messages';
import AddUsersToChat from '#src/services/add-users-to-chat';
import ChatWsModel from '#src/models/chat/chat-ws-model';
import ErrorHandler from '#src/helpers/error-handler';
import { RawData, WebSocket } from 'ws';
import { IChatMessage } from '#src/types/chat.type';
import { ErrorTypes } from '#src/types/errors.type';

export default class ChatWsController {
  private readonly chatModel: ChatWsModel;

  constructor(chatModel: ChatWsModel) {
    this.chatModel = chatModel;
    this.chatModel.attach(new SendMessages());
    this.chatModel.attach(new AddUsersToChat());
  }

  public async WebSocketConnection(socket: WebSocket) {
    try {
      let userId: string | undefined;

      socket.on('message', (data: RawData) => {
        const message = JSON.parse(data.toString()) as IChatMessage;
        if (message.message.type === 'connect') {
          userId = message.message.user_id;
          return this.connectSocket(data, socket);
        }

        return this.chatModel.notify(data);
      });

      socket.on('close', () => this.disconnectSocket(userId, socket));
    } catch (error) {
      console.error(error);
      socket.close();
    }
  }

  public async connectSocket(data: RawData, socket: WebSocket) {
    const message = JSON.parse(data.toString()) as IChatMessage;
    const userId = message.message.user_id;
    this.chatModel.attachUser(userId, socket);
    const chat = await this.chatModel.getChatMessages(message.chat_id);
    if (!chat) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);

    return socket.send(JSON.stringify(chat.dataValues));
  }

  private async disconnectSocket(userId: string | undefined, socket: WebSocket) {
    if (!userId) return;
    this.chatModel.detachUser(userId);
    // Some logic to delete user from chat
    socket.send(JSON.stringify({ message: `${userId} disconnected` }));
  }
}