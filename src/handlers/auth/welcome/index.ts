import IHandler from "../../../models/interfaces/IHandler";
import IMessage from "../../../models/interfaces/IMessage";
import players from "../../../services/Players";
import jwt from 'jsonwebtoken';
import IResponse from "../../../models/interfaces/IResponse";

const x = () => {
    const aa = jwt.sign({}, 'abc');
    console.log(aa);
}

export default class Welcome implements IHandler{
    handle = async (message: IMessage) : Promise<IResponse> => {
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
        const response: IResponse = {
            type: 'a',
            payload: {
                a: 'ab'
            },
            to: 'player'
        }
        return response;
    }
}