import IMessage from './IMessage';
import IResponse from './IResponse';

export default interface IHandler {
  handle(message: IMessage): Promise<IResponse>;
}
