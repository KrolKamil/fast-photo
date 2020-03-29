import ISuperHandler from "../models/interfaces/ISuperHandler"
import IMessage from "../models/interfaces/IMessage"
import TSuperHandlers from "../models/types/TSuperHandlers";

import Auth from './auth';

export default class Handlers {
    handlers: TSuperHandlers
    constructor() {
        this.handlers = new Map();
        this.handlers.set(Auth.name.toLowerCase(), new Auth());
    }
  
    handle = async (message: IMessage) => {
      if (!this.handlers.has(message.type)) {
        throw new Error('No handler for message')
      }
      this.handlers.get(message.prefix)?.handle(message);
    }
  }