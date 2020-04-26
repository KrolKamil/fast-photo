import IHandler from '../../models/interfaces/IHandler';
import { Subject } from 'rxjs';
import IResponse from '../../models/interfaces/IResponse';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/Players';

class AuthCheck implements IHandler {
  static type = 'autch_check';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = (message: IMessage): void => {
    if (message.payload && message.payload.id) {
      if (players.exists(message.payload.id)) {
        const response: IResponse = {
          ws: message.ws,
          message: {
            type: 'auth_check-success'
          }
        };
        this.eventBus.next([response]);
      } else {
        const response: IResponse = {
          ws: message.ws,
          message: {
            type: 'auth_check-error',
            payload: {
              error: 'player does not exist'
            }
          }
        };
        this.eventBus.next([response]);
      }
    } else {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'auth_check-error',
          payload: {
            error: 'id is required'
          }
        }
      };
      this.eventBus.next([response]);
    }
  };
}

export default AuthCheck;
