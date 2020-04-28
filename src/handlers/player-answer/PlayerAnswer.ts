import { Subject } from 'rxjs';
import IHandler from '../../models/interfaces/IHandler';
import IResponse from '../../models/interfaces/IResponse';
import stage, { stages } from '../../services/Stage';
import Player from '../../models/Player';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/players/Players';
import identificator from '../../services/Identificator';
import playersWords from '../../services/players/players-words/PlayersWords';
import { base64ToBuffer } from '../../utils';
import detectLables from '../../api/label';

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

    try {
      if (this.isAnswerCorrect(message.payload.answer)) {
        console.log('winner');
      }
    } catch (e) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_answer-error',
          payload: {
            error: 'error while checking answer - probably wrong answer type'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }
  };

  private isAnswerCorrect = (answer: any): boolean => {
    const buffer = base64ToBuffer(answer);
    const detected = await detectLables(buffer);
    if (detected.Labels) {
      detected.Labels.forEach((label: any) => {
        if (label.Confidence) {
          if (label.Name === playerWord && label.Confidence >= 0.98) {
            return true;
          }
        }
      });
    }
    return false;
  };
}

export default PlayerAnswer;
