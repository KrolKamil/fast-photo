import { BehaviorSubject } from 'rxjs';
import players from '../Players';
import TPlayers from '../../../models/types/TPlayers';
import IPlayer from '../../../models/interfaces/IPlayer';

class PlayersAdmin {
  constructor(
    public adminId: BehaviorSubject<string> = new BehaviorSubject('')
  ) {
    players.observe().subscribe(this.nominateAdmin);
  }

  private getActivePlayer = (): null | IPlayer => {
    let activePlayer = null;
    const currentPlayers = players.getAll();
    currentPlayers.forEach((player) => {
      if (players.isActive(player.id)) {
        activePlayer = player;
      }
    });
    return activePlayer;
  };

  private nominateAdmin = (currentPlayers: TPlayers) => {
    const currentAdminId = this.adminId.getValue();
    if (currentPlayers.size > 0 && currentAdminId === '') {
      this.set(currentPlayers.values().next().value.id);
    }
    if (currentAdminId !== '') {
      if (!players.isActive(currentAdminId)) {
        const activePlayer = this.getActivePlayer();
        if (activePlayer) {
          this.set(activePlayer.id);
        }
      }
    }
  };

  public reset = () => this.adminId.next('');
  public set = (id: string) => this.adminId.next(id);
  public get = () => this.adminId.getValue();
  public observe = () => this.adminId.asObservable();
  public isAdmin = (id: string) => this.adminId.getValue() === id;
}

const playersAdmin = new PlayersAdmin();

export default playersAdmin;
