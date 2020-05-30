import stage, { stages } from '../../services/Stage';
import { resetSocket } from '../../utils';
import players from '../../services/players/Players';
import TPlayers from '../../models/types/TPlayers';

class Game {
  constructor() {
    stage.observe().subscribe(this.handleGameEnd);
    players.observe().subscribe(this.handleGameCancel);
  }

  private handleGameCancel = (currentPlayers: TPlayers) => {
    if (stage.current() === stages.GAME) {
    }
  };

  private handleGameEnd = (currentStage: string): void => {
    if (currentStage === stages.GAME_OVER) {
      resetSocket();
    }
  };
}

export default Game;
