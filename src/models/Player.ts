import IPlayer from "./interfaces/IPlayer";

export default class Player implements IPlayer {
    id: string;
    ws: WebSocket;
    ready: boolean;

    constructor(id: string, ws: WebSocket){
        this.id = id;
        this.ws = ws;
        this.ready = false;
    }

    changeReady = (ready: boolean) => {
        this.ready = ready;
    }
}