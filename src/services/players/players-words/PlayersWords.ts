import words from '../../Words';
import players from '../Players';
import IPlayer from '../../../models/interfaces/IPlayer';
import eventBus from '../../eventBus';

class PlayersWords {
  private wordsAreSet: boolean;
  constructor() {
    this.wordsAreSet = false;
  }

  setPlayersWords = (): void => {
    if (this.wordsAreSet) {
      throw new Error('words are already set');
    }
    this.wordsAreSet = true;
    const allPlayers = players.getAll();
    allPlayers.forEach((player: IPlayer) => {
      player.word = words.getRandomWord();
      players.edit(player.id, player);
    });
  };

  public sendWordsToPlayers = (): Promise<void> => {
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

  getPlayerWord = (playerId: string): string => players.get(playerId).id;
}

const playersWords = new PlayersWords();

export default playersWords;
