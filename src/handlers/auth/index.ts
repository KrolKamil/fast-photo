import IMessage from '../../models/interfaces/IMessage';
import ISuperHandler from '../../models/interfaces/ISuperHandler';
import THandlers from '../../models/types/THandlers';
import Welcome from './welcome';

export default class Auth implements ISuperHandler  {
  handlers: THandlers
  constructor(){
    this.handlers = new Map();
    this.handlers.set(Welcome.name.toLowerCase(), new Welcome());
  }

  handle = async (message: IMessage) => {
    if (!this.handlers.has(message.type)) {
      throw new Error('No handler for message')
    }
    this.handlers.get(message.surfix)?.handle(message);
  }
}