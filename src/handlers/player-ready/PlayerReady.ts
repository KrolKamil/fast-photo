import stage, { stages } from '../../services/Stage';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/players/Players';
import IResponse from '../../models/interfaces/IResponse';
import IHandler from '../../models/interfaces/IHandler';
import { Subject } from 'rxjs';
import playersReady from '../../services/players/players-ready/PlayersReady';

export default class PlayerReady implements IHandler {
  static type = 'player_ready';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = async (message: IMessage): Promise<void> => {
    if (stage.current() !== stages.AWAITING_FOR_PLAYERS) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_ready-error',
          payload: {
            error: 'Queue stage has ended'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (!message.payload.hasOwnProperty('id') || !message.payload.hasOwnProperty('ready')) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_ready-error',
          payload: {
            error: 'id and ready is required'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (!(typeof message.payload.ready === 'boolean')) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_ready-error',
          payload: {
            error: 'ready has to be boolean'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    const player = players.exists(message.payload.id);
    if (!player) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_ready-error',
          payload: {
            error: 'player does not exist'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    playersReady.changeReady(message.payload.id, message.payload.ready);

    const response: IResponse = {
      ws: message.ws,
      message: {
        type: 'player_ready-success',
        payload: {
          ready: message.payload.ready
        }
      }
    };
    this.eventBus.next([response]);
  };
}
