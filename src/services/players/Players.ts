import TPlayers from '../../models/types/TPlayers';
import IPlayer from '../../models/interfaces/IPlayer';
import { BehaviorSubject, Observable } from 'rxjs';

class Players {
  public minimumPlayers = 2;
  public maximumPlayers = 4;
  public admin: string | null = null;
  public maximumInactiveTime = 15000;
  private players: BehaviorSubject<TPlayers>;

  constructor() {
    this.players = new BehaviorSubject(new Map());
  }

  public add = (player: IPlayer): void => {
    if (this.isFull()) {
      throw new Error('no more space for new player');
    }
    this.players.getValue().set(player.id, player);
    this.poke();
  };

  public edit = (player: IPlayer): void => {
    if (!this.exists(player.id)) {
      throw new Error('player not found');
    }
    this.players.getValue().set(player.id, player);
    this.poke();
  };

  public get = (playerId: string): IPlayer => {
    const player = this.players.getValue().get(playerId);
    if (!player) {
      throw new Error('player not found');
    }
    return player;
  };

  public observe = (): Observable<TPlayers> => this.players.asObservable();

  public isFull = (): boolean =>
    this.players.getValue().size >= this.maximumPlayers;

  public exists = (id: string): boolean => this.players.getValue().has(id);

  public getAll = (): TPlayers => this.players.getValue();

  public reset = (): void => {
    this.players.next(new Map());
  };

  public isActive = (id: string): boolean =>
    new Date().getTime() - this.get(id).lastActiveTime <
    this.maximumInactiveTime;

  public poke = (): void => this.players.next(this.players.getValue());
}

const players = new Players();

export default players;
