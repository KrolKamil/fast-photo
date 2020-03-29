import IMessage from "./IMessage";

export default interface IHandler {
  handle(message: IMessage): Promise<void>
}