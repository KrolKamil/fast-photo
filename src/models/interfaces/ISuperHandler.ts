import IMessage from "./IMessage";
import THandlers from "../types/THandlers";

export default interface ISuperHandler {
  handle(message: IMessage): Promise<void>,
  handlers: THandlers
}