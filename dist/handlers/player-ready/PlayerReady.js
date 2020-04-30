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
const PlayersReady_1 = __importDefault(require("../../services/players/players-ready/PlayersReady"));
class PlayerReady {
    constructor(eventBus) {
        this.handle = (message) => __awaiter(this, void 0, void 0, function* () {
            if (Stage_1.default.current() !== Stage_1.stages.AWAITING_FOR_PLAYERS) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_ready-error',
                        payload: {
                            error: 'Queue stage has ended'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            if (!message.payload.id || !message.payload.ready) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_ready-error',
                        payload: {
                            error: 'id and ready is required'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            if (!(typeof message.payload.ready === 'boolean')) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_ready-error',
                        payload: {
                            error: 'ready has to be boolean'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            const player = Players_1.default.exists(message.payload.id);
            if (!player) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'player_ready-error',
                        payload: {
                            error: 'player does not exist'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            PlayersReady_1.default.changeReady(message.payload.id, message.payload.ready);
            const response = {
                ws: message.ws,
                message: {
                    type: 'player_ready-success',
                    payload: {
                        ready: message.payload.ready
                    }
                }
            };
            this.eventBus.next([response]);
        });
        this.eventBus = eventBus;
    }
}
exports.default = PlayerReady;
PlayerReady.type = 'player_ready';
