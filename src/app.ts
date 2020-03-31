require('dotenv').config()
import { Server } from "ws";
import {parseJsonAsync} from './utils';
import messageCreator from './services/creators/message'
import Handlers from "./handlers";
import players from "./services/Players";
import { emit } from "cluster";
const wss: Server = new Server({ port: 3000 });

const handlers = new Handlers();

wss.on(('connection'), (ws) => {
    ws.on('message', async (message: string) => {
        try{
            const parsedMessage = await parseJsonAsync(message);
            const updatedMessage = messageCreator(parsedMessage, ws);
            const response = await handlers.handle(updatedMessage);
            const stringifiedResponse = JSON.stringify(response.response);
            switch(response.to){
                case 'player': {
                    ws.send(stringifiedResponse)
                    break;
                }
                case 'players': {
                    players.sendToAll(stringifiedResponse);
                    break;
                }
                case 'all': {
                    wss.clients.forEach((client) => {
                        client.send(stringifiedResponse);
                    })
                    break;
                }
            }
        } catch (e) {
            ws.send(JSON.stringify({
                type: 'internal error',
                payload: {
                    error: e.message
                }
            }));
        }
    });
});