import { Server } from "http";
import stage, { stages } from "../../services/Stage";
import players from "../../services/Players";

export default class Game {
    wss: Server;
    constructor(wss: Server) {
        this.wss = wss;
        stage.observe().subscribe(this.handleNewStage)
    }

    handleNewStage = (stage: string) => {
        if((stage === stages.GAME) && (players.getPlayersHaveWords() === false)){
            
        }
    }
}