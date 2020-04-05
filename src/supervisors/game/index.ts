import {Server} from 'ws';
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
            players.setPlayersWords();
            players.informPlayersAboutTheirWords();
        } else if (stage === stages.GAME_OVER){
            this.informAboutWinner();
            this.resetEverything();
        }
    }

    informAboutWinner = () => {
        players.sendToAll(JSON.stringify({
            type: 'game_over',
            payload: {
                winner: players.getWinner()
            }
        }))
    }

    resetEverything = () => {
        players.reset();
        stage.reset();
    }
}

