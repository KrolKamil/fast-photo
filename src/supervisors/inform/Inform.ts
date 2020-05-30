import eventBus from '../../services/eventBus';
import IResponse from '../../models/interfaces/IResponse';
import playersPublic, {
  PlayerPublicInformation
} from '../../services/players/players-public/PlayersPublic';
import players from '../../services/players/Players';

class Inform {
  constructor(private notifyInterval: NodeJS.Timeout | null = null) {
    playersPublic.observe().subscribe(this.sendPlayersInformations);
    this.startNotifiInterval();
  }

  public startNotifiInterval = () =>
    (this.notifyInterval = setInterval(players.poke, 15000));
  public stopNotifyInterval = () =>
    this.notifyInterval !== null ? clearInterval(this.notifyInterval) : null;

  private sendPlayersInformations = (
    playersInformation: PlayerPublicInformation[]
  ): void => {
    if (playersInformation.length > 0) {
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
