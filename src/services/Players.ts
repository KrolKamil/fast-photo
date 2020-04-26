import TPlayers from '../models/types/TPlayers';
import IPlayer from '../models/interfaces/IPlayer';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import words from './Words';

class Players {
  private players: BehaviorSubject<TPlayers>;
  private playersHaveWords: boolean;
  private winner: string | null;
  constructor() {
    this.players = new BehaviorSubject(new Map());
    this.playersHaveWords = false;
    this.winner = null;
  }

  getWinner = () => {
    return this.winner;
  };

  setWinner = (id: string) => {
    if (this.exists(id)) {
      this.winner = id;
    }
  };

  reset = () => {
    this.playersHaveWords = false;
    this.players.next(new Map());
    this.winner = null;
  };

  getPlayerWord = (id: string) => {
    if (this.playersHaveWords === false) {
      throw new Error('players do not have words!');
    }
    const player = this.players.getValue().get(id);
    if (!player) {
      throw new Error('player does not exists');
    }
    return player.word;
  };

  setPlayersWords = () => {
    this.playersHaveWords = true;
    this.players.getValue().forEach((player) => {
      player.word = words.getRandomWord();
    });
  };

  informPlayerAboutHisWord = (id: string) => {
    if (this.playersHaveWords === false) {
      throw new Error('player does not have loaded words');
    }
    const player = this.players.getValue().get(id);
    if (player) {
      player.ws.send(
        JSON.stringify({
          type: 'player_word',
          payload: {
            word: player.word
          }
        })
      );
    }
  };

  informPlayersAboutTheirWords = () => {
    if (this.playersHaveWords === false) {
      throw new Error('players do not have loaded words');
    }
    this.players.getValue().forEach((player) => {
      const stringifiedMessage = JSON.stringify({
        type: 'player_word',
        payload: {
          word: player.word
        }
      });
      console.log(stringifiedMessage);
      player.ws.send(stringifiedMessage);
    });
  };

  getPlayersHaveWords = (): boolean => this.playersHaveWords;

  getPlayersStatuses = () => {
    return this.players.asObservable().pipe(
      map((Players) => {
        const playerStatuses: Array<boolean> = [];
        Players.forEach((player) => {
          playerStatuses.push(player.ready);
        });
        return playerStatuses;
      })
    );
  };

  sendToAll = (stringifiedMessage: string) => {
    this.players.getValue().forEach((player) => {
      player.ws.send(stringifiedMessage);
    });
  };

  changeReady = (id: string, ready: boolean) => {
    const player = this.players.getValue().get(id);
    if (!player) {
      throw Error('player not found');
    }
    player.ready = ready;
    this.players.next(this.players.getValue());
  };

  exists = (token: string) => {
    return this.players.getValue().has(token);
  };

  isFull = () => {
    if (this.players.getValue().size >= 4) {
      return true;
    }
    return false;
  };

  add = (player: IPlayer) => {
    if (this.isFull()) {
      throw new Error('players storage is full');
    }
    this.players.getValue().set(player.id, player);
    this.players.next(this.players.getValue());
  };
}

const players = new Players();

export default players;
