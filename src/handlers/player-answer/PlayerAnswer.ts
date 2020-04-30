import { Subject } from 'rxjs';
import IHandler from '../../models/interfaces/IHandler';
import IResponse from '../../models/interfaces/IResponse';
import stage, { stages } from '../../services/Stage';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/players/Players';
import { base64ToBuffer } from '../../utils';
import detectLables from '../../api/label';
import playersWords from '../../services/players/players-words/PlayersWords';

class PlayerAnswer implements IHandler {
  static type = 'player_answer';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = async (message: IMessage): Promise<void> => {
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

    if (!message.payload || !message.payload.id || !message.payload.answer) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_answer-error',
          payload: {
            error: 'player id and answer are required'
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
      const isCorrect = await this.isAnswerCorrect(
        message.payload.answer,
        message.payload.id
      );
      if (isCorrect) {
        const responses: Array<IResponse> = [];
        players.getAll().forEach((player) => {
          const response: IResponse = {
            ws: player.ws,
            message: {
              type: 'game_over',
              payload: {
                winner: player.id
              }
            }
          };
          responses.push(response);
        });
        this.eventBus.next(responses);
        stage.change(stages.GAME_OVER);
        return;
      } else {
        const response: IResponse = {
          ws: message.ws,
          message: {
            type: 'player_answer-wrong',
            payload: {
              message: 'wrong answer'
            }
          }
        };
        this.eventBus.next([response]);
        return;
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

  private isAnswerCorrect = async (
    answer: any,
    id: string
  ): Promise<boolean> => {
    const playerWord = playersWords.getPlayerWord(id);
    const buffer = base64ToBuffer(answer);
    const detected = await detectLables(buffer);
    console.log(playerWord);
    if (detected.Labels) {
      detected.Labels.forEach((label: any) => {
        console.log(label.Name);
        console.log(label.Confidence);
      })
      const findedWord = detected.Labels.find(
        (label: any) => label.Name === playerWord && label.Confidence >= 0.98
      );
      if (findedWord) {
        return true;
      }
    }
    return false;
  };
}

export default PlayerAnswer;
