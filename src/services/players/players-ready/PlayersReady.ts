import players from '../Players';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class PlayersReady {
  public changeReady = (id: string, ready: boolean): void => {
    const player = players.get(id);
    player.ready = ready;
    players.edit(player);
  };

  public allReqiredReady = (): Observable<boolean> =>
    this.observeStatuses().pipe(
      map(
        (statuses) =>
          !statuses.includes(false) && statuses.length >= players.minimumPlayers
      )
    );

  private observeStatuses = (): Observable<Array<boolean>> =>
    players.observe().pipe(
      map((Players: any) => {
        const statuses: Array<boolean> = [];
        Players.forEach((player: any) => {
          statuses.push(player.ready);
        });
        return statuses;
      })
    );
}

const playersReady = new PlayersReady();
export default playersReady;
