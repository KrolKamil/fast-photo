import eventBus from '../../services/eventBus';
import IResponse from '../../models/interfaces/IResponse';
import stage, { stages } from '../../services/Stage';
import playersPublic, {
  PlayerPublicInformation
} from '../../services/players/players-public/PlayersPublic';
import players from '../../services/players/Players';

class Inform {
  constructor() {
    playersPublic.observe().subscribe(this.sendPlayersInformations);
  }

  private sendPlayersInformations = (
    playersInformation: PlayerPublicInformation[]
  ): void => {
    if (
      stage.current() === stages.AWAITING_FOR_PLAYERS &&
      playersInformation.length > 0
    ) {
      const responses: Array<IResponse> = [];
      players.getAll().forEach((player) => {
        const response: IResponse = {
          ws: player.ws,
          message: {
            type: 'players_information',
            payload: {
              information: playersInformation
            }
          }
        };
        responses.push(response);
      });
      eventBus.next(responses);
    }
  };
}

export default Inform;
