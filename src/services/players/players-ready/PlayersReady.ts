import players from '../Players';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

class PlayersReady {
  public isRequiredPeopleReady = () => {
    let countPlayersReady = 0;
    players.getAll().forEach((player) => {
      if (player.ready) {
        countPlayersReady++;
      }
    });
    return countPlayersReady >= players.minimumPlayers;
  }

  public changeReady = (id: string, ready: boolean): void => {
    const player = players.get(id);
    player.ready = ready;
    players.edit(player);
  };

  // public allReqiredReady = (): Observable<boolean> =>
  //   this.observeStatuses()
  //     .pipe(map((statuses) => statuses.map((status) => status.ready)))
  //     .pipe(
  //       map(
  //         (statusesBoolean) =>
  //           !statusesBoolean.includes(false) &&
  //           statusesBoolean.length >= players.minimumPlayers
  //       )
  //     );

  // public observeStatuses = (): Observable<Array<PlayerReadyInformation>> =>
  //   players.observe().pipe(
  //     map((Players) => {
  //       const statuses: Array<PlayerReadyInformation> = [];
  //       Players.forEach((player) => {
  //         const playerReadyInformation: PlayerReadyInformation = {
  //           id: player.id,
  //           ready: player.ready
  //         };
  //         statuses.push(playerReadyInformation);
  //       });
  //       return statuses;
  //     })
  //   );
}

export interface PlayerReadyInformation {
  id: string;
  ready: boolean;
}

const playersReady = new PlayersReady();
export default playersReady;
