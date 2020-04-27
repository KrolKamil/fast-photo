import IHandler from '../../../models/interfaces/IHandler';
import IMessage from '../../../models/interfaces/IMessage';
import IResponse from '../../../models/interfaces/IResponse';
import stage, { stages } from '../../../services/Stage';
import players from '../../../services/Players';
import playersReady from '../../../services/players/players-ready/PlayersReady';

export default class Ready implements IHandler {
  handle = async (message: IMessage): Promise<IResponse> => {
    if (stage.current() !== stages.AWAITING_FOR_PLAYERS) {
      const response: IResponse = {
        response: {
          type: 'auth_welcome-error',
          payload: {
            error: 'queue stage has ended'
          }
        },
        to: 'player'
      };
      return response;
    }
    if (!message.payload.id || !message.payload.ready) {
      throw new Error('required id and ready in payload');
    }
    if (!(typeof message.payload.ready === 'boolean')) {
      const response: IResponse = {
        response: {
          type: 'player_ready-error',
          payload: {
            error: 'ready has to be boolean'
          }
        },
        to: 'player'
      };
      return response;
    }
    const player = players.exists(message.payload.id);
    if (!player) {
      const response: IResponse = {
        response: {
          type: 'player_ready-error',
          payload: {
            error: 'player of id does not exists'
          }
        },
        to: 'player'
      };
      return response;
    }

    playersReady.changeReady(message.payload.id, message.payload.ready);

    const response: IResponse = {
      response: {
        type: 'player_ready-success'
      },
      to: 'player'
    };
    return response;
  };
}
