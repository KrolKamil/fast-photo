"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Players_1 = __importDefault(require("../Players"));
const operators_1 = require("rxjs/operators");
class PlayersReady {
    constructor() {
        this.changeReady = (id, ready) => {
            const player = Players_1.default.get(id);
            player.ready = ready;
            Players_1.default.edit(player);
        };
        this.allReqiredReady = () => this.observeStatuses().pipe(operators_1.map((statuses) => !statuses.includes(false) && statuses.length >= Players_1.default.minimumPlayers));
        this.observeStatuses = () => Players_1.default.observe().pipe(operators_1.map((Players) => {
            const statuses = [];
            Players.forEach((player) => {
                statuses.push(player.ready);
            });
            return statuses;
        }));
    }
}
const playersReady = new PlayersReady();
exports.default = playersReady;
