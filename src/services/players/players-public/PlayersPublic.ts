import players from '../Players';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import playersAdmin from '../players-admin/PlayersAdmin';

export const isActive = (lastActiveTime: number) => ((new Date).getTime() - lastActiveTime) < 15000;

class PlayersPublic {
  observe = (): Observable<PlayerPublicInformation[]> =>
    players.observe().pipe(
      map((Players) => {
        const publicInformations: PlayerPublicInformation[] = [];
        Players.forEach((player) => {
          const playerReadyInformation: PlayerPublicInformation = {
            id: player.id,
            ready: player.ready,
            name: player.name,
            active: isActive(player.lastActiveTime),
            isAdmin: playersAdmin.isAdmin(player.id)
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
  active: boolean;
  isAdmin: boolean;
}

const playersPublic = new PlayersPublic();

export default playersPublic;
