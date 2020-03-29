import IMessage from '../../models/interfaces/IMessage';
import ISuperHandler from '../../models/interfaces/ISuperHandler';
import THandlers from '../../models/types/THandlers';
import Welcome from './welcome';
import IResponse from '../../models/interfaces/IResponse';

export default class Auth implements ISuperHandler  {
  handlers: THandlers
  constructor(){
    this.handlers = new Map();
    this.handlers.set(Welcome.name.toLowerCase(), new Welcome());
  }

  handle = async (message: IMessage): Promise<IResponse> => {
    const handler = this.handlers.get(message.surfix);
    if(!handler){
      throw new Error('no handler for message');
    }
    return handler.handle(message);
  }
}