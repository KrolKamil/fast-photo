import stage, { stages } from '../../services/Stage';
import playersReady from '../../services/players/players-ready/PlayersReady';

class Game {
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
    playersReady.allReqiredReady().subscribe(this.startManager);
  }

  private startManager = (allPlayersReady: boolean): void => {
    if (allPlayersReady && stage.current() === stages.AWAITING_FOR_PLAYERS) {
      this.startGame();
    }
  };

  private start = (): void => {
    stage.set(stages.GAME);
  };
}

export default Game;
