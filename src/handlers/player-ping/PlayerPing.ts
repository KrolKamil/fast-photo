import { Subject } from "rxjs";
import IResponse from "../../models/interfaces/IResponse";
import IMessage from "../../models/interfaces/IMessage";
import IHandler from "../../models/interfaces/IHandler";
import players from "../../services/players/Players";

class PlayerPing implements IHandler {
  static type = 'player_ping';
  constructor(
    private eventBus: Subject<Array<IResponse>>
  ) { }

  handle = async (message: IMessage): Promise<void> => {
    if (!message.payload || !message.payload.id) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'player_ping-error',
          payload: {
            error: 'Missing player Id'
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
          type: 'player_ping-error',
          payload: {
            error: 'Wrong player id'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    const player = players.get(message.payload.id);
    player.lastActiveTime = (new Date).getTime();
    players.edit(player);

    const response: IResponse = {
      ws: message.ws,
      message: {
        type: 'player_pong',
        payload: {}
      }
    };
    this.eventBus.next([response]);
    return;
  }
};