import TPlayers from "../models/types/TPlayers";
import IPlayer from "../models/interfaces/IPlayer";
import { BehaviorSubject } from "rxjs";

class Players {
    players: BehaviorSubject<TPlayers>
    constructor() {
        this.players = new BehaviorSubject(new Map());
    }

    changeReady = (id: string, ready: boolean) => { 
        const player = this.players.getValue().get(id);
        if(!player){
            throw Error('player not found');
        }
        player.ready = ready;
        this.players.next(this.players.getValue());
    }

    exists = (token: string) => {
        return this.players.getValue().has(token);
    }

    isFull = () => {
        if(this.players.getValue().size >= 4) {
            return true;
        }
    }

    add = (player: IPlayer) => {
        if(this.isFull()){
            throw new Error('players storage is full')
        }
        this.players.getValue().set(player.id, player);
        this.players.next(this.players.getValue());
    }
}

const players = new Players();

export default players;