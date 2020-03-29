import IHandler from "../models/interfaces/IHandler"
import IMessage from "../models/interfaces/IMessage"

export default class Handlers {
    handlers: Map<string, IHandler>
    constructor(handlers: Map<string, IHandler>) {
      this.handlers = handlers
    }
  
    handle(message: IMessage) {
      if (!this.handlers.has(message.type)) {
        throw new Error('No handler for message')
      }
      this.handlers.get(message.type)?.handle(message.payload);
    }
  }