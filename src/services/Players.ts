import TPlayers from '../models/types/TPlayers';
import IPlayer from '../models/interfaces/IPlayer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class Players {
  private minimumPlayers = 2;
  private maximumPlayers = 4;
  private players: BehaviorSubject<TPlayers>;
  constructor() {
    this.players = new BehaviorSubject(new Map());
  }

  public add = (player: IPlayer): void => {
    if (this.isFull()) {
      throw new Error('no more space for new player');
    }
    this.players.getValue().set(player.id, player);
    this.players.next(this.players.getValue());
  };

  public edit = (player: IPlayer): void => {
    if (!this.exists(player.id)) {
      throw new Error('player not found');
    }
    this.players.getValue().set(player.id, player);
  };

  public isFull = (): boolean =>
    this.players.getValue().size >= this.maximumPlayers;

  public exists = (token: string): boolean =>
    this.players.getValue().has(token);

  // public allReqiredReady = (): Observable<boolean> =>
  //   this.observeStatuses().pipe(
  //     map(
  //       (statuses) =>
  //         !statuses.includes(false) && statuses.length >= this.minimumPlayers
  //     )
  //   );

  // private observeStatuses = (): Observable<Array<boolean>> =>
  //   this.players.asObservable().pipe(
  //     map((Players) => {
  //       const statuses: Array<boolean> = [];
  //       Players.forEach((player) => {
  //         statuses.push(player.ready);
  //       });
  //       return statuses;
  //     })
  //   );

  // changeReady = (id: string, ready: boolean) => {
  //   const player = this.players.getValue().get(id);
  //   if (!player) {
  //     throw Error('player not found');
  //   }
  //   player.ready = ready;
  //   this.players.next(this.players.getValue());
  // };

  // getWinner = () => {
  //   return this.winner;
  // };

  // setWinner = (id: string) => {
  //   if (this.exists(id)) {
  //     this.winner = id;
  //   }
  // };

  // reset = () => {
  //   this.playersHaveWords = false;
  //   this.players.next(new Map());
  //   this.winner = null;
  // };

  // getPlayerWord = (id: string) => {
  //   if (this.playersHaveWords === false) {
  //     throw new Error('players do not have words!');
  //   }
  //   const player = this.players.getValue().get(id);
  //   if (!player) {
  //     throw new Error('player does not exists');
  //   }
  //   return player.word;
  // };

  // setPlayersWords = () => {
  //   this.playersHaveWords = true;
  //   this.players.getValue().forEach((player) => {
  //     player.word = words.getRandomWord();
  //   });
  // };

  // informPlayerAboutHisWord = (id: string) => {
  //   if (this.playersHaveWords === false) {
  //     throw new Error('player does not have loaded words');
  //   }
  //   const player = this.players.getValue().get(id);
  //   if (player) {
  //     player.ws.send(
  //       JSON.stringify({
  //         type: 'player_word',
  //         payload: {
  //           word: player.word
  //         }
  //       })
  //     );
  //   }
  // };

  // informPlayersAboutTheirWords = () => {
  //   if (this.playersHaveWords === false) {
  //     throw new Error('players do not have loaded words');
  //   }
  //   this.players.getValue().forEach((player) => {
  //     const stringifiedMessage = JSON.stringify({
  //       type: 'player_word',
  //       payload: {
  //         word: player.word
  //       }
  //     });
  //     console.log(stringifiedMessage);
  //     player.ws.send(stringifiedMessage);
  //   });
  // };

  // getPlayersHaveWords = (): boolean => this.playersHaveWords;

  // getPlayersStatuses = () => {
  //   return this.players.asObservable().pipe(
  //     map((Players) => {
  //       const playerStatuses: Array<boolean> = [];
  //       Players.forEach((player) => {
  //         playerStatuses.push(player.ready);
  //       });
  //       return playerStatuses;
  //     })
  //   );
  // };

  // sendToAll = (stringifiedMessage: string) => {
  //   this.players.getValue().forEach((player) => {
  //     player.ws.send(stringifiedMessage);
  //   });
  // };
}

const players = new Players();

export default players;
