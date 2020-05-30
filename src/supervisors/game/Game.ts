import stage, { stages } from '../../services/Stage';
import { resetSocket } from '../../utils';
import players from '../../services/players/Players';
import playersActive from '../../services/players/players-active/PlayersActive';

class Game {
  private gameCancelTimeout: NodeJS.Timeout | null;
  constructor() {
    this.gameCancelTimeout = null;
    stage.observe().subscribe(this.handleGameEnd);
    players.observe().subscribe(this.handleGameCancel);
  }

  private handleGameCancel = (): void => {
    if (stage.current() === stages.GAME) {
      if (
        playersActive.areAllPlayersInactive() &&
        this.gameCancelTimeout === null
      ) {
        this.setGameCancelTimeout();
      } else if (
        !playersActive.areAllPlayersInactive() &&
        this.gameCancelTimeout !== null
      ) {
        this.unsetGameCancelTimeout();
      }
    }
  };

  private gameCancel = (): void => {
    resetSocket();
  };

  private setGameCancelTimeout = (): void => {
    this.gameCancelTimeout = setTimeout(this.gameCancel, 15000);
  };

  private unsetGameCancelTimeout = (): void => {
    if (this.gameCancelTimeout !== null) {
      clearTimeout(this.gameCancelTimeout);
      this.gameCancelTimeout = null;
    }
  };

  private handleGameEnd = (currentStage: string): void => {
    if (currentStage === stages.GAME_OVER) {
      resetSocket();
    }
  };
}

export default Game;
