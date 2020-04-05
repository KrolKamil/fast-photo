"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (message) => {
    if ((message.type) && (message.payload)) {
        true;
    }
    return false;
};
exports.default = validate;
