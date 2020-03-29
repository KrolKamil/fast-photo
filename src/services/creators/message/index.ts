import IMessage from "../../../models/interfaces/IMessage"

const getPrefixAndSurfixOfType = {
    
};

const message = (message: any) => {
    if(message){
        if( (message.type) && (message.payload) ){
            const newMessage: IMessage = {
                type: message.type,
                payload: message.payload,

            }
            return newMessage;
        }
    }
    throw new Error('Type and payload are required')
}