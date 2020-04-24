import IHandler from "../../../models/interfaces/IHandler";
import IMessage from "../../../models/interfaces/IMessage";
import players from "../../../services/Players";
import IResponse from "../../../models/interfaces/IResponse";
import identificator from '../../../services/Identificator'
import Player from "../../../models/Player";
import stage, {stages} from "../../../services/Stage";

export default class Welcome implements IHandler{
    handle = async (message: IMessage) : Promise<IResponse> => {
        if(stage.current() !== stages.AWAITING_FOR_PLAYERS) {
                const response: IResponse =  {
                    response: {
                        type: 'auth_welcome-error',
                        payload: {
                            error: 'queue stage has ended'
                        }
                    },
                    to: 'player'
                }
                return response;
        }
        if(message.payload.token){
            if(players.exists(message.payload.token)){
                const response: IResponse =  {
                    response: {
                        type: 'auth_welcome-success',
                        payload: {
                            token: message.payload.token
                        }
                    },
                    to: 'player'
                }
                return response;
            } else {
                const response: IResponse =  {
                    response: {
                        type: 'auth_welcome-error',
                    payload: {
                        error: 'invalid id'
                    }
                    },
                    to: 'player'
                }
                return response;
            }
        } else {
            if(players.isFull()){
                const response: IResponse =  {
                   response: {
                    type: 'auth_welcome-error',
                    payload: {
                        error: 'no more space for new players'
                    }
                   },
                    to: 'player'
                }
                return response;
            } else {
                const id = identificator.generate();
                players.add(new Player(id, message.ws))
                const response: IResponse =  {
                    response: {
                        type: 'auth_welcome-success',
                        payload: {
                            id
                        }
                    },
                    to: 'player'
                }
                return response;
            }
        }
    }
}