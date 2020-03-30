import IHandler from "../../../models/interfaces/IHandler";
import IMessage from "../../../models/interfaces/IMessage";
import players from "../../../services/Players";
import IResponse from "../../../models/interfaces/IResponse";
import IPlayer from "../../../models/interfaces/IPlayer";
import identificator from '../../../services/Identificator'

export default class Welcome implements IHandler{
    handle = async (message: IMessage) : Promise<IResponse> => {
        if(message.payload.token){
            if(players.exists(message.payload.token)){
                const response: IResponse =  {
                    type: 'auth_welcome-success',
                    payload: {
                        token: message.payload.token
                    },
                    to: 'player'
                }
                return response;
            } else {
                const response: IResponse =  {
                    type: 'auth_welcome-error',
                    payload: {
                        error: 'invalid token'
                    },
                    to: 'player'
                }
                return response;
            }
        } else {
            if(players.isFull()){
                const response: IResponse =  {
                    type: 'auth_welcome-success',
                    payload: {
                        error: 'no more space for new players'
                    },
                    to: 'player'
                }
                return response;
            } else {
                const newPlayer: IPlayer = {
                    id: identificator.generate(),
                    ws: message.ws
                }
                players.add(newPlayer);
                const response: IResponse =  {
                    type: 'auth_welcome-error',
                    payload: {
                        token: 'no more space for new players'
                    },
                    to: 'player'
                }
                return response;
            }
        }
    }
}