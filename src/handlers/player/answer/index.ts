import IHandler from "../../../models/interfaces/IHandler";
import IMessage from "../../../models/interfaces/IMessage";
import IResponse from "../../../models/interfaces/IResponse";
import detectLables from "../../../api/label";
import stage, { stages } from "../../../services/Stage";
import { base64ToBuffer } from "../../../utils";
import players from "../../../services/Players";

export default class Answer implements IHandler {
    handle = async (message: IMessage): Promise<IResponse> => {
        if(stage.current() !== stages.GAME){
            const response: IResponse = {
                response: {
                    type: 'player_answer-error',
                    payload: {
                        error: 'wrong stage'
                    }
                },
                to: 'player'
            }
            return response;
        }
        if( !(message.payload.id) || !(message.payload.answer)){
            const response: IResponse = {
                response: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'payload requires id and answer'
                        }
                    },
                    to: 'player'
                }
                return response;
            }

            const player = players.exists(message.payload.id);
            if(!player){
                const response: IResponse = {
                    response: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'player of id does not exists'
                        },
                    },
                    to: 'player'
                }
                return response;
            }

        try{
            let wrongAnswer = true;
            const playerWord = players.getPlayerWord(message.payload.id);
            const buffer = base64ToBuffer(message.payload.answer);
            const detected = await detectLables(buffer);
            if(detected.Labels){
                detected.Labels.forEach((label) => {
                    if(label === playerWord){
                        wrongAnswer = false;
                    }
                })
            }
            if(wrongAnswer){
                
        const response: IResponse = {
            response: {
                type: 'player_answer-wrong'
            },
            to: 'player'
        }
        return response;
            } else {
                const response: IResponse = {
                    response: {
                        type: 'game_over',
                        payload: {
                            winner: message.payload.id
                        }
                    },
                    to: 'players'
                }
                return response;
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }
}