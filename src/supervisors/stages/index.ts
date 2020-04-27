import players from '../../services/players/Players';
import stage, { stages } from '../../services/Stage';

export default class Stages {
  constructor() {
    players.getPlayersStatuses().subscribe(this.handleNewPlayersStatuses);
  }

  gameStartedMessage = () => {
    return JSON.stringify({
      type: 'stage',
      payload: {
        name: 'game'
      }
    });
  };

  setGameStage = () => {
    players.sendToAll(this.gameStartedMessage());
    stage.change(stages.GAME);
  };

  handleNewPlayersStatuses = (playerStatuses: Array<boolean>) => {
    if (stage.current() === stages.AWAITING_FOR_PLAYERS) {
      if (playerStatuses.length >= 2) {
        const somePlayerIsNotReady = playerStatuses.includes(false);
        if (!somePlayerIsNotReady) {
          this.setGameStage();
        }
      }
    }
  };
}
