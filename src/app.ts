require('dotenv').config()
import { Server } from "ws";
import {parseJsonAsync} from './utils';
import isMessage from './services/validators/message';
// import Handlers from './handlers';
// import Auth from './handlers/auth';
// import IHandler from "./models/interfaces/IHandler";
// import IHandlers from "./models/interfaces/IHandlers";

const wss: Server = new Server({ port: 8080 });

// const coreHandlers = new Map<string, IHandler>();
// coreHandlers.set(Auth.name.toLowerCase(), new Auth());

// const handlers = new Handlers();

wss.on(('connection'), (ws) => {
    ws.on('message', async (message: string) => {
        try{
            const parsedMessage = await parseJsonAsync(message);
            if(isMessage(parsedMessage)){
            }
        } catch (e) {

        }
    });
})