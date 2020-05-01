import IPlayer from './interfaces/IPlayer';
import WebSocket from 'ws';

export default class Player implements IPlayer {
  id: string;
  name: string;
  ready: boolean;
  word: string | null;
  ws: WebSocket;

  constructor(id: string, ws: WebSocket) {
    this.id = id;
    this.ws = ws;
    this.ready = false;
    this.word = null;
    this.name = 'Anonymous'
  }
}
