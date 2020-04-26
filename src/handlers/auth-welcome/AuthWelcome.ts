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

// import IHandler from '../../../models/interfaces/IHandler';
// import IMessage from '../../../models/interfaces/IMessage';
// import players from '../../../services/Players';
// import IResponse from '../../../models/interfaces/IResponse';
// import identificator from '../../../services/Identificator';
// import Player from '../../../models/Player';

// class Welcome implements IHandler {
//   static type = 'test';
//   handle = async (message: IMessage): Promise<IResponse> => {
//     if (stage.current() !== stages.AWAITING_FOR_PLAYERS) {
//       const response: IResponse = {
//         response: {
//           type: 'auth_welcome-error',
//           payload: {
//             error: 'queue stage has ended'
//           }
//         },
//         to: 'player'
//       };
//       return response;
//     }
//     if (message.payload.token) {
//       if (players.exists(message.payload.token)) {
//         const response: IResponse = {
//           response: {
//             type: 'auth_welcome-success',
//             payload: {
//               token: message.payload.token
//             }
//           },
//           to: 'player'
//         };
//         return response;
//       } else {
//         const response: IResponse = {
//           response: {
//             type: 'auth_welcome-error',
//             payload: {
//               error: 'invalid id'
//             }
//           },
//           to: 'player'
//         };
//         return response;
//       }
//     } else {
//       if (players.isFull()) {
//         const response: IResponse = {
//           response: {
//             type: 'auth_welcome-error',
//             payload: {
//               error: 'no more space for new players'
//             }
//           },
//           to: 'player'
//         };
//         return response;
//       } else {
//         const id = identificator.generate();
//         players.add(new Player(id, message.ws));
//         const response: IResponse = {
//           response: {
//             type: 'auth_welcome-success',
//             payload: {
//               id
//             }
//           },
//           to: 'player'
//         };
//         return response;
//       }
//     }
//   };
// }

// export default Welcome;
