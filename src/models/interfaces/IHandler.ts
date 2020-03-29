import IMessage from "./IMessage";

export default interface ISuperHandler {
  type: string,
  handle(message: IMessage): void
}