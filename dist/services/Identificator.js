"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Identyfikator {
    constructor() {
        this.generate = () => {
            return uuid_1.v4();
        };
    }
}
const identyfikator = new Identyfikator();
exports.default = identyfikator;
