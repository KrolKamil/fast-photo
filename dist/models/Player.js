"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id, ws) {
        this.id = id;
        this.ws = ws;
        this.ready = false;
        this.word = null;
    }
}
exports.default = Player;
