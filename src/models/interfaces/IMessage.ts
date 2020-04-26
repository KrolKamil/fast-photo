import WebSocket from 'ws';

export default interface IMessage {
  ws: WebSocket;
  type: string;
  payload: any;
}
