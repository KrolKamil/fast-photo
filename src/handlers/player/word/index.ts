import IHandler from '../../../models/interfaces/IHandler';
import IMessage from '../../../models/interfaces/IMessage';
import IResponse from '../../../models/interfaces/IResponse';
import players from '../../../services/Players';
import stage, { stages } from '../../../services/Stage';

export default class Word implements IHandler {
  handle = async (message: IMessage): Promise<IResponse> => {
    if (stage.current() !== stages.GAME) {
      const response: IResponse = {
        response: {
          type: 'player_word-error',
          payload: {
            message: 'no game stage'
          }
        },
        to: 'player'
      };
      return response;
    }
    if (message.payload.id) {
      if (!players.exists(message.payload.id)) {
        const response: IResponse = {
          response: {
            type: 'player_word-error',
            payload: {
              message: 'player od id does not exists'
            }
          },
          to: 'player'
        };
        return response;
      } else {
        players.informPlayerAboutHisWord(message.payload.id);
      }
    }
    const response: IResponse = {
      response: {
        type: 'player_word-error',
        payload: {
          message: 'missing player id'
        }
      },
      to: 'player'
    };
    return response;
  };
}
