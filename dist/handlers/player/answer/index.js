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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const label_1 = __importDefault(require("../../../api/label"));
const Stage_1 = __importStar(require("../../../services/Stage"));
const utils_1 = require("../../../utils");
const Players_1 = __importDefault(require("../../../services/Players"));
class Answer {
    constructor() {
        this.handle = (message) => __awaiter(this, void 0, void 0, function* () {
            if (Stage_1.default.current() !== Stage_1.stages.GAME) {
                const response = {
                    response: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'wrong stage'
                        }
                    },
                    to: 'player'
                };
                return response;
            }
            if (!(message.payload.id) || !(message.payload.answer)) {
                const response = {
                    response: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'payload requires id and answer'
                        }
                    },
                    to: 'player'
                };
                return response;
            }
            const player = Players_1.default.exists(message.payload.id);
            if (!player) {
                const response = {
                    response: {
                        type: 'player_answer-error',
                        payload: {
                            error: 'player of id does not exists'
                        },
                    },
                    to: 'player'
                };
                return response;
            }
            try {
                let wrongAnswer = true;
                const playerWord = Players_1.default.getPlayerWord(message.payload.id);
                const buffer = utils_1.base64ToBuffer(message.payload.answer);
                const detected = yield label_1.default(buffer);
                if (detected.Labels) {
                    detected.Labels.forEach((label) => {
                        console.log(`my word ${playerWord}, label found: ${label.Name}, confidence: ${label.Confidence}`);
                        if (label.Confidence) {
                            if ((label.Name === playerWord) && (label.Confidence >= 0.98)) {
                                wrongAnswer = false;
                            }
                        }
                    });
                }
                if (wrongAnswer) {
                    const response = {
                        response: {
                            type: 'player_answer-wrong'
                        },
                        to: 'player'
                    };
                    return response;
                }
                else {
                    Players_1.default.setWinner(message.payload.id);
                    Stage_1.default.change(Stage_1.stages.GAME_OVER);
                    // RESET
                    const response = {
                        response: {
                            type: 'player_answer-correct'
                        },
                        to: 'player'
                    };
                    return response;
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = Answer;
