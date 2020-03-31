import IHandler from "../../../models/interfaces/IHandler";
import IMessage from "../../../models/interfaces/IMessage";
import IResponse from "../../../models/interfaces/IResponse";

export default class Answer implements IHandler {
    handle = async (message: IMessage): Promise<IResponse> => {
        console.log(message.payload.image);
        const response: IResponse = {
            response: {
                type: 'player_answer'
            },
            to: 'player'
        }
        return response;
    }
}