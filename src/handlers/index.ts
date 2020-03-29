import ISuperHandler from "../models/interfaces/ISuperHandler"
import IMessage from "../models/interfaces/IMessage"

import Auth from './auth';

export default class Handlers {
    handlers: Map<string, ISuperHandler>
    constructor() {
        this.handlers = new Map();
        this.loadHandlers();
    }

    loadHandlers = () => {
        this.handlers.set(Auth.name.toLowerCase(), new Auth());
    }
  
    handle = (message: IMessage) => {
      if (!this.handlers.has(message.type)) {
        throw new Error('No handler for message')
      }
      this.handlers.get(message.type)?.handle(message);
    }
  }