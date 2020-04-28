import words from '../../Words';
import players from '../Players';
import IPlayer from '../../../models/interfaces/IPlayer';

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

  getPlayerWord = (playerId: string): string => players.get(playerId).id;
}

const playersWords = new PlayersWords();

export default playersWords;
