import IPlayer from './interfaces/IPlayer';
import WebSocket from 'ws';

export default class Player implements IPlayer {
  constructor(
    public id: string,
    public ws: WebSocket,
    public ready: boolean = false,
    public word: string | null = null,
    public name: string = 'Anonymous',
    public lastActiveTime: number = new Date().getTime()
  ) {}
}
