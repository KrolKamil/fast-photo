"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const utils_1 = require("../../utils");
const label_1 = __importDefault(require("../../api/label"));
const PlayersWords_1 = __importDefault(require("../../services/players/players-words/PlayersWords"));
class PlayerAnswer {
    constructor(eventBus) {
        this.handle = (message) => __awaiter(this, void 0, void 0, function* () {
            if (Stage_1.default.current() !== Stage_1.stages.GAME) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'Wrong stage.'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            if (!message.payload || !message.payload.id || !message.payload.answer) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'player id and answer are required'
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
                        type: 'player_answer-error',
                        payload: {
                            error: 'Player of this id does not exist'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            try {
                const isCorrect = yield this.isAnswerCorrect(message.payload.answer, message.payload.id);
                if (isCorrect) {
                    const responses = [];
                    Players_1.default.getAll().forEach((player) => {
                        const response = {
                            ws: player.ws,
                            message: {
                                type: 'game_over',
                                payload: {
                                    winner: player.id
                                }
                            }
                        };
                        responses.push(response);
                    });
                    this.eventBus.next(responses);
                    Stage_1.default.change(Stage_1.stages.GAME_OVER);
                    return;
                }
                else {
                    const response = {
                        ws: message.ws,
                        message: {
                            type: 'player_answer-wrong',
                            payload: {
                                message: 'wrong answer'
                            }
                        }
                    };
                    this.eventBus.next([response]);
                    return;
                }
            }
            catch (e) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'error while checking answer - probably wrong answer type'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
        });
        this.isAnswerCorrect = (answer, id) => __awaiter(this, void 0, void 0, function* () {
            const playerWord = PlayersWords_1.default.getPlayerWord(id);
            const buffer = utils_1.base64ToBuffer(answer);
            const detected = yield label_1.default(buffer);
            console.log(playerWord);
            if (detected.Labels) {
                detected.Labels.forEach((label) => {
                    console.log(label.Name);
                    console.log(label.Confidence);
                });
                const findedWord = detected.Labels.find((label) => label.Name === playerWord && label.Confidence >= 0.98);
                if (findedWord) {
                    return true;
                }
            }
            return false;
        });
        this.eventBus = eventBus;
    }
}
PlayerAnswer.type = 'player_answer';
exports.default = PlayerAnswer;
