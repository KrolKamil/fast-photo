import IMessage from '../models/interfaces/IMessage';
import IHandler from '../models/interfaces/IHandler';

interface IHandlers {
  [key: string]: IHandler;
}

export default class Handlers {
  handlers: IHandlers;
  constructor(handlers: IHandlers) {
    this.handlers = handlers;
  }

  handle = async (message: IMessage): Promise<void> => {
    if (!this.handlers[message.type]) {
      throw new Error('missing handler for message');
    } else {
      this.handlers[message.type].handle(message);
    }
  };
}
