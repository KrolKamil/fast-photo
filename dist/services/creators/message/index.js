"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message = (message, ws) => {
    if (message.type) {
        const updatedMessage = {
            ws,
            type: message.type,
            payload: message.payload ? message.payload : null
        };
        return updatedMessage;
    }
    throw new Error('Type and payload are required');
};
exports.default = message;
