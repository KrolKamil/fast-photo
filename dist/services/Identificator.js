"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Identificator {
    constructor() {
        this.generate = () => {
            return uuid_1.v4();
        };
    }
}
const identificator = new Identificator();
exports.default = identificator;
