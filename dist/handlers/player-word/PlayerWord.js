"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stage_1 = __importStar(require("../../services/Stage"));
const Players_1 = __importDefault(require("../../services/players/Players"));
const PlayersWords_1 = __importDefault(require("../../services/players/players-words/PlayersWords"));
class PlayerWord {
    constructor(eventBus) {
        this.handle = (message) => {
            if (Stage_1.default.current() !== Stage_1.stages.GAME) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_word-error',
                        payload: {
                            error: 'Wrong stage. Words are not loaded yet'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            if (!message.payload || !message.payload.id) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_word-error',
                        payload: {
                            error: 'Missing player Id'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            if (!Players_1.default.exists(message.payload.id)) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_word-error',
                        payload: {
                            error: 'Wrong player id'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            const response = {
                ws: message.ws,
                message: {
                    type: 'player_word',
                    payload: {
                        word: PlayersWords_1.default.getPlayerWord(message.payload.id)
                    }
                }
            };
            this.eventBus.next([response]);
            return;
        };
        this.eventBus = eventBus;
    }
}
PlayerWord.type = 'player_word';
exports.default = PlayerWord;
