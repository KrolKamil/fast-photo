import IMessage from '../../models/interfaces/IMessage';
import ISuperHandler from '../../models/interfaces/ISuperHandler';
import THandlers from '../../models/types/THandlers';
import IResponse from '../../models/interfaces/IResponse';
import Ready from './ready';
import Answer from './answer';

export default class Player implements ISuperHandler {
  handlers: THandlers;
  constructor() {
    this.handlers = new Map();
    this.handlers.set(Ready.name.toLowerCase(), new Ready());
    this.handlers.set(Answer.name.toLowerCase(), new Answer());
  }

  handle = async (message: IMessage): Promise<IResponse> => {
    const handler = this.handlers.get(message.surfix);
    if (!handler) {
      throw new Error('no handler for message');
    }
    return handler.handle(message);
  };
}
