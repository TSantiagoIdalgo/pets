import ErrorHandler from '#src/helpers/error-handler';
import ChatModel from '#src/models/chat/chat-model';
import { ErrorTypes } from '#src/types/errors.type';
import { NextFunction, Request, Response } from 'express';


export default class ChatController {
  private readonly chatModel: ChatModel;
  
  constructor (chatModel: ChatModel) {
    this.chatModel = chatModel;
  }

  public getChatById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chatId } = req.params;
      if (!chatId) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      
      const chat = await this.chatModel.getChatById(chatId);
      if (!chat) throw new ErrorHandler(404, ErrorTypes.NOT_FOUND);

      res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  };
}