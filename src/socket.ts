require('dotenv').config();
import WebSocket from 'ws';
import { Server } from 'http';
import { parseJsonAsync } from './utils';
import messageCreator from './services/creators/message';
import Handlers from './handlers/Handlers';
import eventBus from './services/eventBus';
import AuthWelcome from './handlers/auth-welcome/AuthWelcome';
import AuthCheck from './handlers/auth-check/AuthCheck';
import Game from './supervisors/game/Game';
import amazonWebServices from './services/AWS';
import PlayerAnswer from './handlers/player-answer/PlayerAnswer';
import PlayerReady from './handlers/player-ready/PlayerReady';
import PlayerWord from './handlers/player-word/PlayerWord';
import StageCurrent from './handlers/stage-current/StageCurrent';
import Inform from './supervisors/inform/Inform';
import PlayerPing from './handlers/player-ping/PlayerPing';
import GameStart from './handlers/game-start/GameStart';
import PlayerName from './handlers/player-name/PlayerName';
import Space from './supervisors/space/Space';

const game = new Game();
const inform = new Inform();
const space = new Space();

const handlers = new Handlers({
  [AuthWelcome.type]: new AuthWelcome(eventBus),
  [AuthCheck.type]: new AuthCheck(eventBus),
  [PlayerAnswer.type]: new PlayerAnswer(eventBus),
  [PlayerReady.type]: new PlayerReady(eventBus),
  [PlayerWord.type]: new PlayerWord(eventBus),
  [PlayerName.type]: new PlayerName(eventBus),
  [StageCurrent.type]: new StageCurrent(eventBus),
  [PlayerPing.type]: new PlayerPing(eventBus),
  [GameStart.type]: new GameStart(eventBus)
});

const socket = (server: Server): void => {
  const wss: WebSocket.Server = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    if (amazonWebServices.isOperating()) {
      ws.on('message', async (message: string) => {
        try {
          const parsedMessage = await parseJsonAsync(message);
          const updatedMessage = messageCreator(parsedMessage, ws);
          handlers.handle(updatedMessage);
        } catch (e) {
          ws.send(
            JSON.stringify({
              type: 'error_internal',
              payload: {
                error: e.message
              }
            })
          );
        }
      });
    } else {
      ws.send(
        JSON.stringify({
          type: 'error_internal',
          payload: {
            message: 'SERVER DOES NOT RECIVE AWS KEYS'
          }
        })
      );
    }
  });
};

export default socket;
