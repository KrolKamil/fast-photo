import stage, { stages } from '../../services/Stage';
import playersReady from '../../services/players/players-ready/PlayersReady';
import playersWords from '../../services/players/players-words/PlayersWords';
import IResponse from '../../models/interfaces/IResponse';
import players from '../../services/players/Players';
import eventBus from '../../services/eventBus';

class Game {
  constructor() {
    playersReady.allReqiredReady().subscribe(this.startManager);
  }

  private startManager = (allPlayersReady: boolean): void => {
    if (allPlayersReady && stage.current() === stages.AWAITING_FOR_PLAYERS) {
      this.startGame();
    }
  };

  private start = async (): void => {
    stage.set(stages.GAME);
    playersWords.setPlayersWords();
    await this.sendWordsToPlayers();
  };

  sendWordsToPlayers = (): Promise<void> => {
    const responses: Array<IResponse>;
    players.getAll().forEach((player) => {
      const response: IResponse = {
        ws: player.ws,
        message: {
          type: 'player_word',
          payload: {
            word: player.word
          }
        }
      };
      responses.push(response);
    });
    eventBus.next(responses);
  };
}

export default Game;
