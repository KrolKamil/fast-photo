import ISuperHandler from "../models/interfaces/ISuperHandler"
import IMessage from "../models/interfaces/IMessage"
import TSuperHandlers from "../models/types/TSuperHandlers";

import Auth from './auth';
import IResponse from "../models/interfaces/IResponse";
import Player from "./player";

export default class Handlers {
    handlers: TSuperHandlers
    constructor() {
        this.handlers = new Map();
        this.handlers.set(Auth.name.toLowerCase(), new Auth());
        this.handlers.set(Player.name.toLowerCase(), new Player());
    }
  
    handle = async (message: IMessage): Promise<IResponse> => {
      const handler = this.handlers.get(message.prefix)
      if(!handler){
        throw new Error('missing handler for message');
      }
      return handler.handle(message);
    }
  }