"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class Players {
    constructor() {
        this.minimumPlayers = 2;
        this.maximumPlayers = 4;
        this.add = (player) => {
            if (this.isFull()) {
                throw new Error('no more space for new player');
            }
            this.players.getValue().set(player.id, player);
            this.players.next(this.players.getValue());
        };
        this.edit = (player) => {
            if (!this.exists(player.id)) {
                throw new Error('player not found');
            }
            this.players.getValue().set(player.id, player);
            this.players.next(this.players.getValue());
        };
        this.get = (playerId) => {
            const player = this.players.getValue().get(playerId);
            if (!player) {
                throw new Error('player not found');
            }
            return player;
        };
        this.observe = () => this.players.asObservable();
        this.isFull = () => this.players.getValue().size >= this.maximumPlayers;
        this.exists = (id) => this.players.getValue().has(id);
        this.getAll = () => this.players.getValue();
        this.reset = () => {
            this.players.next(new Map());
        };
        this.players = new rxjs_1.BehaviorSubject(new Map());
    }
}
const players = new Players();
exports.default = players;
