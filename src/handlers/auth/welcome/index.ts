import IHandler from "../../../models/interfaces/IHandler";
import IMessage from "../../../models/interfaces/IMessage";
import players from "../../../services/Players";

export default class Welcome implements IHandler{
    preHandle = (payload: any) => {
        if(!payload.token) {
            throw new Error('missing token');
        }
    }

    handle = async (message: IMessage) => {
        if(message.payload.token){
            if(players.exists(message.payload.token)){
                // send ok
            } else {
                //send missing
            }
        } else {
            if(players.isFull()){
                // send full
            } else {
                // send ok
            }
        }
    }
}