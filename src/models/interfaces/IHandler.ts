import IMessage from './IMessage';

export default interface IHandler {
  // type: string;
  handle(message: IMessage): void;
}
