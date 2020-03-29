import IMessage from "../../../models/interfaces/IMessage"

const getPrefixAndSurfixOfType = (type: string) => {
    const indexOfSeparator = type.search('_');
    if(indexOfSeparator === -1){
        throw new Error('Type is invalid');
    }
    const splitedType: Array<string> = type.split('_');
    if(splitedType.length > 2){
        throw new Error('Type is invalid');
    }
    return {
        prefix: splitedType[0],
        surfix: splitedType[1]
    }
};

const message = (message: any): IMessage => {
    if(message){
        if( (message.type) && (message.payload) ){
            const dividedType = getPrefixAndSurfixOfType(message.type);
            const newMessage: IMessage = {
                type: message.type,
                payload: message.payload,
                prefix: dividedType.prefix,
                surfix: dividedType.surfix
            }
            return newMessage;
        }
    }
    throw new Error('Type and payload are required')
}

export default message;