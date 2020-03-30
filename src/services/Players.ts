import TPlayers from "../models/types/TPlayers";
import IPlayers from "../models/interfaces/IPlayers";
import IPlayer from "../models/interfaces/IPlayer";

class Players implements IPlayers {
    players: TPlayers
    constructor() {
        this.players = new Map();
    }

    exists = (token: string) => {
        return this.players.has(token);
    }

    isFull = () => {
        if(this.players.size >= 4) {
            return true;
        }
    }

    add = (player: IPlayer) => {
        if(this.isFull()){
            throw new Error('players storage is full')
        }
        this.players.set(player.id, player);
    }

    getAll = (): TPlayers => {
        return this.players;
    }
}

const players = new Players();

export default players;