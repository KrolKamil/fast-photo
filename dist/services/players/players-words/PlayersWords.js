"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Words_1 = __importDefault(require("../../Words"));
const Players_1 = __importDefault(require("../Players"));
const eventBus_1 = __importDefault(require("../../eventBus"));
class PlayersWords {
    constructor() {
        this.reset = () => {
            this.wordsAreSet = false;
        };
        this.setPlayersWords = () => {
            if (this.wordsAreSet) {
                throw new Error('words are already set');
            }
            this.wordsAreSet = true;
            const allPlayers = Players_1.default.getAll();
            allPlayers.forEach((player) => {
                player.word = Words_1.default.getRandomWord();
                Players_1.default.edit(player);
            });
        };
        this.sendWordsToPlayers = () => {
            const responses = [];
            Players_1.default.getAll().forEach((player) => {
                const response = {
                    ws: player.ws,
                    message: {
                        type: 'player_word',
                        payload: {
                            word: player.word
                        }
                    }
                };
                responses.push(response);
            });
            eventBus_1.default.next(responses);
        };
        this.getPlayerWord = (playerId) => {
            const word = Players_1.default.get(playerId).word;
            if (!word) {
                throw new Error('Player does not have word');
            }
            return word;
        };
        this.wordsAreSet = false;
    }
}
const playersWords = new PlayersWords();
exports.default = playersWords;
