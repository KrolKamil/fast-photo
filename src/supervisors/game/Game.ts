import stage, { stages } from '../../services/Stage';
import playersReady from '../../services/players/players-ready/PlayersReady';
import playersWords from '../../services/players/players-words/PlayersWords';
import { resetSocket } from '../../utils';

class Game {
  constructor() {
    playersReady.allReqiredReady().subscribe(this.handleGameStart);
    stage.observe().subscribe(this.handleGameEnd);
    playersReady.observeStatuses().subscribe((a: any) => console.log(a))
  }

  private handleGameStart = (allPlayersReady: boolean): void => {
    console.log('handle game start');
    console.log(allPlayersReady);
    console.log(stage.current());
    if (allPlayersReady && stage.current() === stages.AWAITING_FOR_PLAYERS) {
      this.start();
    }
  };

  private start = async (): Promise<void> => {
    console.log('starting game');
    stage.change(stages.GAME);
    playersWords.setPlayersWords();
    await playersWords.sendWordsToPlayers();
  };

  private handleGameEnd = (currentStage: string): void => {
    if (currentStage === stages.GAME_OVER) {
      resetSocket();
    }
  };
}

export default Game;
