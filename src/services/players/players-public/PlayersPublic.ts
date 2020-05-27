import players from '../Players';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

class PlayersPublic {
  observe = (): Observable<PlayerPublicInformation[]> =>
    players.observe().pipe(
      map((Players) => {
        const publicInformations: PlayerPublicInformation[] = [];
        Players.forEach((player) => {
          const playerReadyInformation: PlayerPublicInformation = {
            id: player.id,
            ready: player.ready,
            name: player.name
          };
          publicInformations.push(playerReadyInformation);
        });
        return publicInformations;
      })
    );
}

export interface PlayerPublicInformation {
  id: string;
  name: string;
  ready: boolean;
}

const playersPublic = new PlayersPublic();

export default playersPublic;
