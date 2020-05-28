import { Subject } from 'rxjs';
import IHandler from '../../models/interfaces/IHandler';
import IResponse from '../../models/interfaces/IResponse';
import stage, { stages } from '../../services/Stage';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/players/Players';
import playersWords from '../../services/players/players-words/PlayersWords';

class PlayerWord implements IHandler {
  static type = 'player_name';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = async (message: IMessage): Promise<void> => {
    if (stage.current() !== stages.AWAITING_FOR_PLAYERS) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_name-error',
          payload: {
            error: 'Wrong stage. Words are not loaded yet'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (!message.payload || !message.payload.id || !message.payload.name) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_name-error',
          payload: {
            error: 'Player id and name are required'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (!players.exists(message.payload.id)) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_name-error',
          payload: {
            error: 'Wrong player id'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    const player = players.get(message.payload.id);
    player.name = message.payload.name;
    players.edit(player);

    const response: IResponse = {
      ws: message.ws,
      message: {
        type: 'player_name-success',
        payload: {
          name: message.payload.name
        }
      }
    };
    this.eventBus.next([response]);
    return;
  };
}

export default PlayerWord;
