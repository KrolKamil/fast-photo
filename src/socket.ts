require('dotenv').config();
import WebSocket from 'ws';
import { Server } from 'http';
import { parseJsonAsync } from './utils';
import messageCreator from './services/creators/message';
import Handlers from './handlers';
import players from './services/Players';
import Stages from './supervisors/stages';
import Game from './supervisors/game';
import amazonWebServices from './services/AWS';

const socket = (server: Server) => {
  const wss: WebSocket.Server = new WebSocket.Server({ server });
  const handlers = new Handlers();
  const supervisorStages = new Stages();
  const supervisorGame = new Game(wss);

  wss.on('connection', (ws) => {
    ws.on('message', async (message: string) => {
      if (amazonWebServices.isOperating()) {
        try {
          const parsedMessage = await parseJsonAsync(message);
          const updatedMessage = messageCreator(parsedMessage, ws);
          const response = await handlers.handle(updatedMessage);
          const stringifiedResponse = JSON.stringify(response.response);
          switch (response.to) {
            case 'player': {
              ws.send(stringifiedResponse);
              break;
            }
            case 'players': {
              players.sendToAll(stringifiedResponse);
              break;
            }
            case 'all': {
              wss.clients.forEach((client) => {
                client.send(stringifiedResponse);
              });
              break;
            }
          }
        } catch (e) {
          ws.send(
            JSON.stringify({
              type: 'internal error',
              payload: {
                error: e.message
              }
            })
          );
        }
      } else {
        ws.send(
          JSON.stringify({
            type: 'aws_error',
            payload: {
              error: 'missing aws configuration'
            }
          })
        );
      }
    });
  });
};

export default socket;
