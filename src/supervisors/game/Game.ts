import stage, { stages } from '../../services/Stage';
import playersReady from '../../services/players/players-ready/PlayersReady';
import playersWords from '../../services/players/players-words/PlayersWords';

class Game {
  constructor() {
    playersReady.allReqiredReady().subscribe(this.startManager);
    stage.observe().subscribe(this.handleGameEnd);
  }

  private startManager = (allPlayersReady: boolean): void => {
    if (allPlayersReady && stage.current() === stages.AWAITING_FOR_PLAYERS) {
      this.startGame();
    }
  };

  private start = async (): void => {
    stage.set(stages.GAME);
    playersWords.setPlayersWords();
    await playersWords.sendWordsToPlayers();
  };

  private handleGameEnd = () => {};
}

export default Game;
