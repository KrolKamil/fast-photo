import WebSocket from 'ws';

export default interface IPlayer {
  id: string;
  name: string;
  ready: boolean;
  word: string | null;
  ws: WebSocket;
}
