import IMessage from '../../../models/interfaces/IMessage';
import WebSocket from 'ws';

const message = (message: any, ws: WebSocket): IMessage => {
  if (message.type) {
    const updatedMessage: IMessage = {
      ws,
      type: message.type,
      payload: message.payload ? message.payload : null
    };
    return updatedMessage;
  }
  throw new Error('Type and payload are required');
};

export default message;
