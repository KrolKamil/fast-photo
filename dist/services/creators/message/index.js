"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPrefixAndSurfixOfType = (type) => {
    const indexOfSeparator = type.search('_');
    if (indexOfSeparator === -1) {
        throw new Error('Type is invalid');
    }
    const splitedType = type.split('_');
    if (splitedType.length > 2) {
        throw new Error('Type is invalid');
    }
    return {
        prefix: splitedType[0],
        surfix: splitedType[1]
    };
};
const message = (message, ws) => {
    if (message) {
        if ((message.type) && (message.payload)) {
            const dividedType = getPrefixAndSurfixOfType(message.type);
            const newMessage = {
                type: message.type,
                payload: message.payload,
                prefix: dividedType.prefix,
                surfix: dividedType.surfix,
                ws
            };
            return newMessage;
        }
    }
    throw new Error('Type and payload are required');
};
exports.default = message;
