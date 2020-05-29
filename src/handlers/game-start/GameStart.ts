import IHandler from "../../models/interfaces/IHandler";
import { Subject } from "rxjs";
import IResponse from "../../models/interfaces/IResponse";
import IMessage from "../../models/interfaces/IMessage";
import stage, { stages } from "../../services/Stage";
import playersAdmin from "../../services/players/players-admin/PlayersAdmin";
import playersReady from "../../services/players/players-ready/PlayersReady";
import playersWords from "../../services/players/players-words/PlayersWords";
import players from "../../services/players/Players";

export default class GameStart implements IHandler {
  static type = 'game_start';

  constructor(
    private eventBus: Subject<Array<IResponse>>
  ) { }

  handle = async (message: IMessage): Promise<void> => {
    if (stage.current() !== stages.AWAITING_FOR_PLAYERS) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'game_start-error',
          payload: {
            error: 'Wrong stage.'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (!message.payload || !message.payload.id) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'game_start-error',
          payload: {
            error: 'player id is required'
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
          type: 'game_start-error',
          payload: {
            error: 'Wrong player id'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }


    if (!playersAdmin.isAdmin(message.payload.id)) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'game_start-error',
          payload: {
            error: 'Player of this id is not admin'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (playersReady.isRequiredPeopleReady() === false) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'game_start-error',
          payload: {
            error: 'Not enough ready players to start game'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    if (players.get(message.payload.id).ready === false) {
      const response: IResponse = {
        ws: message.ws,
        message: {
          type: 'game_start-error',
          payload: {
            error: 'You are not ready!'
          }
        }
      };
      this.eventBus.next([response]);
      return;
    }

    const response: IResponse = {
      ws: message.ws,
      message: {
        type: 'game_start-success',
        payload: {}
      }
    };
    this.eventBus.next([response]);

    stage.change(stages.GAME);
    playersWords.setPlayersWords();
    await playersWords.sendWordsToPlayers();
  }
}