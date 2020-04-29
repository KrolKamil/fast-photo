import stage, { stages } from '../../services/Stage';
import playersReady from '../../services/players/players-ready/PlayersReady';
import playersWords from '../../services/players/players-words/PlayersWords';
import { resetSocket } from '../../utils';

class Game {
  constructor() {
    playersReady.allReqiredReady().subscribe(this.handleGameStart);
    stage.observe().subscribe(this.handleGameEnd);
  }

  private handleGameStart = (allPlayersReady: boolean): void => {
    if (allPlayersReady && stage.current() === stages.AWAITING_FOR_PLAYERS) {
      this.start();
    }
  };

  private start = async (): Promise<void> => {
    stage.change(stages.GAME);
    playersWords.setPlayersWords();
    await playersWords.sendWordsToPlayers();
  };

  private handleGameEnd = (): void => {
    resetSocket();
  };
}

export default Game;
