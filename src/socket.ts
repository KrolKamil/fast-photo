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

const game = new Game();

const handlers = new Handlers({
  [AuthWelcome.type]: new AuthWelcome(eventBus),
  [AuthCheck.type]: new AuthCheck(eventBus)
});

const socket = (server: Server): void => {
  const wss: WebSocket.Server = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
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
  });
};

export default socket;
