"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const Words_1 = __importDefault(require("./Words"));
class Players {
    constructor() {
        this.getWinner = () => {
            return this.winner;
        };
        this.setWinner = (id) => {
            if (this.exists(id)) {
                this.winner = id;
            }
        };
        this.reset = () => {
            this.playersHaveWords = false;
            this.players.next(new Map());
            this.winner = null;
        };
        this.getPlayerWord = (id) => {
            if (this.playersHaveWords === false) {
                throw new Error('players do not have words!');
            }
            const player = this.players.getValue().get(id);
            if (!player) {
                throw new Error('player does not exists');
            }
            return player.word;
        };
        this.setPlayersWords = () => {
            this.playersHaveWords = true;
            this.players.getValue().forEach((player) => {
                player.word = Words_1.default.getRandomWord();
            });
        };
        this.informPlayerAboutHisWord = (id) => {
            if (this.playersHaveWords === false) {
                throw new Error('player does not have loaded words');
            }
            const player = this.players.getValue().get(id);
            if (player) {
                player.ws.send(JSON.stringify({
                    type: 'player_word',
                    payload: {
                        word: player.word
                    }
                }));
            }
        };
        this.informPlayersAboutTheirWords = () => {
            if (this.playersHaveWords === false) {
                throw new Error('players do not have loaded words');
            }
            this.players.getValue().forEach((player) => {
                const stringifiedMessage = JSON.stringify({
                    type: 'player_word',
                    payload: {
                        word: player.word
                    }
                });
                console.log(stringifiedMessage);
                player.ws.send(stringifiedMessage);
            });
        };
        this.getPlayersHaveWords = () => this.playersHaveWords;
        this.getPlayersStatuses = () => {
            return this.players.asObservable().pipe(operators_1.map((Players) => {
                const playerStatuses = [];
                Players.forEach((player) => {
                    playerStatuses.push(player.ready);
                });
                return playerStatuses;
            }));
        };
        this.sendToAll = (stringifiedMessage) => {
            this.players.getValue().forEach((player) => {
                player.ws.send(stringifiedMessage);
            });
        };
        this.changeReady = (id, ready) => {
            const player = this.players.getValue().get(id);
            if (!player) {
                throw Error('player not found');
            }
            player.ready = ready;
            this.players.next(this.players.getValue());
        };
        this.exists = (token) => {
            return this.players.getValue().has(token);
        };
        this.isFull = () => {
            if (this.players.getValue().size >= 4) {
                return true;
            }
            return false;
        };
        this.add = (player) => {
            if (this.isFull()) {
                throw new Error('players storage is full');
            }
            this.players.getValue().set(player.id, player);
            this.players.next(this.players.getValue());
        };
        this.players = new rxjs_1.BehaviorSubject(new Map());
        this.playersHaveWords = false;
        this.winner = null;
    }
}
const players = new Players();
exports.default = players;
