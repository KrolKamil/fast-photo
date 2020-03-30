import {Server} from 'ws';
import players from '../../services/Players';
import stage, { stages } from '../../services/Stage';
import IResponse from '../../models/interfaces/IResponse';


export default class Stages {
    wss: Server
    constructor(wss: Server){
        this.wss = wss;
        players.getPlayersStatuses().subscribe(this.handleNewPlayersStatuses);
    }

    awaitingForGameStageMessage = () => {
        return JSON.stringify({
            type: 'stage',
            payload: {
                name: 'awaiting-for-game'
            }
        })
    }

    gameStartedMessage = () => {
        return JSON.stringify({
            type: 'stage',
            payload: {
                name: 'game'
            }
        })
    }

    setAwaitingForGameStage = () => {
        stage.change(stages.AWAITING_FOR_GAME);
        players.sendToAll(this.awaitingForGameStageMessage());
    }

    setGameStage = () => {
        stage.change(stages.GAME);
        players.sendToAll(this.gameStartedMessage());
    }

    handleNewPlayersStatuses = (playerStatuses: Array<boolean>) => {
        if(stage.current() === stages.AWAITING_FOR_PLAYERS){
            if(playerStatuses.length >= 2) {
                const somePlayerIsNotReady = playerStatuses.includes(false);
                if(!somePlayerIsNotReady){
                    this.setAwaitingForGameStage();
                    setTimeout(this.setGameStage, 3000);
                }
            }
        }
    }
}