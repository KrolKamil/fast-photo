import { Subject } from 'rxjs';
import IHandler from '../../models/interfaces/IHandler';
import IResponse from '../../models/interfaces/IResponse';
import stage, { stages } from '../../services/Stage';
import Player from '../../models/Player';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/players/Players';
import identificator from '../../services/Identificator';
import playersWords from '../../services/players/players-words/PlayersWords';

class PlayerWord implements IHandler {
  static type = 'player_word';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = (message: IMessage): void => {
    if (stage.current() !== stages.GAME) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_word-error',
          payload: {
            error: 'Wrong stage. Words are not loaded yet'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (!message.payload || !message.payload.playerId) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_word-error',
          payload: {
            error: 'Wrong stage. Words are not loaded yet'
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
          type: 'player_word-error',
          payload: {
            error: 'Wrong playerId'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    const response: IResponse = {
      ws: message.ws,
      message: {
        type: 'player_word',
        payload: {
          word: playersWords.getPlayerWord(message.payload.playerId)
        }
      }
    };
    this.eventBus.next([response]);
    return;
  };
}

export default PlayerWord;
