import { Subject } from 'rxjs';
import IHandler from '../../models/interfaces/IHandler';
import IResponse from '../../models/interfaces/IResponse';
import stage, { stages } from '../../services/Stage';
import Player from '../../models/Player';
import IMessage from '../../models/interfaces/IMessage';
import players from '../../services/Players';
import identificator from '../../services/Identificator';

class AuthWelcome implements IHandler {
  static type = 'auth_welcome';
  private eventBus: Subject<Array<IResponse>>;

  constructor(eventBus: Subject<Array<IResponse>>) {
    this.eventBus = eventBus;
  }

  handle = (message: IMessage): void => {
    if (stage.current() !== stages.AWAITING_FOR_PLAYERS) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'auth_welcome-error',
          payload: {
            error: 'Queue stage has ended'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (players.isFull()) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'auth_welcome-error',
          payload: {
            error: 'No more space for new players'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    const id = identificator.generate();
    players.add(new Player(id, message.ws));
    const response: IResponse = {
      ws: message.ws,
      message: {
        type: 'auth_welcome-success',
        payload: {
          id
        }
      }
    };
    this.eventBus.next([response]);
  };
}

export default AuthWelcome;
