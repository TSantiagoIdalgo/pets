import { IChatMessage } from '#src/types/chat.type';
import { Observer } from '#src/types/observer.interface';
import { WebSocket } from 'ws';
import Messages from '#src/database/tables/messages';

export default class SendMessages implements Observer {
  async update(message: IChatMessage, client?: Map<string, WebSocket>) {
    const users = message.usersInChat;
    const newMessage = await Messages.create({ ...message.message });
    users.forEach(user => {
      const userClient = client?.get(user);
      if (userClient) userClient.send(JSON.stringify({ 
        type: 'new_message', 
        ...newMessage.dataValues
      }));
    });
  }  
}