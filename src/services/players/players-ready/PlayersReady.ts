import players from '../Players';

class PlayersReady {
  public changeReady = (id: string, ready: boolean): void => {
    const player = players.get(id);
    player.ready = ready;
    players.edit(player.id, player);
  };

  public allReqiredReady = (): Observable<boolean> =>
    this.observeStatuses().pipe(
      map(
        (statuses) =>
          !statuses.includes(false) && statuses.length >= players.minimumPlayers
      )
    );

  private observeStatuses = (): Observable<Array<boolean>> =>
    players.asObservable().pipe(
      map((Players) => {
        const statuses: Array<boolean> = [];
        Players.forEach((player) => {
          statuses.push(player.ready);
        });
        return statuses;
      })
    );
}

const playersReady = new PlayersReady();
export default playersReady;
