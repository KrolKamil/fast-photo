import { BehaviorSubject } from 'rxjs';
import players from '../Players';
import TPlayers from '../../../models/types/TPlayers';

class PlayersAdmin {
  constructor(
    public adminId: BehaviorSubject<string> = new BehaviorSubject('')
  ) {
    players.observe().subscribe(this.nominateAdmin);
  }

  private nominateAdmin = (players: TPlayers) => {
    if (players.size > 0 &&
      this.adminId.getValue() === '') {
      this.set(players.values().next().value.id);
    }
  }

  public set = (id: string) => this.adminId.next(id);
  public get = () => this.adminId.getValue();
  public observe = () => this.adminId.asObservable();
  public isAdmin = (id: string) => this.adminId.getValue() === id;
}

const playersAdmin = new PlayersAdmin();

export default playersAdmin;