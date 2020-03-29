import IMessage from "./IMessage";
import THandlers from "../types/THandlers";
import IResponse from "./IResponse";

export default interface ISuperHandler {
  handle(message: IMessage): Promise<IResponse>,
  handlers: THandlers
}