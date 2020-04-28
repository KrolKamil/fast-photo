import { Subject } from 'rxjs';
import IHandler from '../../models/interfaces/IHandler';
import IResponse from '../../models/interfaces/IResponse';
import stage, { stages } from '../../services/Stage';
import Player from '../../models/Player';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/players/Players';
import identificator from '../../services/Identificator';
import playersWords from '../../services/players/players-words/PlayersWords';

class PlayerAnswer implements IHandler {
  static type = 'player_answer';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = (message: IMessage): void => {
    if (stage.current() !== stages.GAME) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_answer-error',
          payload: {
            error: 'Wrong stage.'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (
      !message.payload ||
      !message.payload.playerId ||
      !message.payload.answer
    ) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_answer-error',
          payload: {
            error: 'playerId and anser are required'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (!players.exists(message.payload.playerId)) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_answer-error',
          payload: {
            error: 'Player of this id does not exist'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }
  };
}

export default PlayerAnswer;
