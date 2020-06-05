import IMessage from '../models/interfaces/IMessage';
import IHandler from '../models/interfaces/IHandler';
import playerWs from './middlewares/player-ws/playerWs';

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
      try {
        await playerWs(message);
        await this.handlers[message.type].handle(message);
      } catch (e) {
        console.warn(`Error in handler. Description: ${e.message}`)
      }
    }
  };
}
