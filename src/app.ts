require('dotenv').config()
import { Server } from "ws";
import {parseJsonAsync} from './utils';
import messageCreator from './services/creators/message'
import Handlers from "./handlers";
const wss: Server = new Server({ port: 3000 });

const handlers = new Handlers();

wss.on(('connection'), (ws) => {
    ws.on('message', async (message: string) => {
        try{
            const parsedMessage = await parseJsonAsync(message);
            const updatedMessage = messageCreator(parsedMessage, ws);
            const response = await handlers.handle(updatedMessage);
        } catch (e) {
            ws.send(e.message);
        }
    });
});