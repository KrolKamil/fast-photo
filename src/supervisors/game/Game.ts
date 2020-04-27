import stage, { stages } from '../../services/Stage';
import players from '../../services/Players';

class Game {
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
    players.allReqiredReady().subscribe(this.startGameManager);
  }

  private startGameManager = (allPlayersReady: boolean): void => {
    if (allPlayersReady && stage.current() !== stages.GAME) {
      this.startGame();
    }
  };

  private startGame = (): void => {};
}

export default Game;
