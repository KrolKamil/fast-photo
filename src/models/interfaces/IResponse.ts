import WebSocket from 'ws';

export default interface IResponse {
  ws: WebSocket;
  message: {
    type: string;
    payload?: object;
  };
}
