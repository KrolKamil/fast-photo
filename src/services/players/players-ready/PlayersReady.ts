import players from '../Players';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

class PlayersReady {
  public isRequiredPeopleReady = (): boolean => {
    let countPlayersReady = 0;
    players.getAll().forEach((player) => {
      if (player.ready) {
        countPlayersReady++;
      }
    });
    return countPlayersReady >= players.minimumPlayers;
  };

  public changeReady = (id: string, ready: boolean): void => {
    const player = players.get(id);
    player.ready = ready;
    players.edit(player);
  };
}

export interface PlayerReadyInformation {
  id: string;
  ready: boolean;
}

const playersReady = new PlayersReady();
export default playersReady;
