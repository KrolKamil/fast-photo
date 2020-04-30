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
const Player_1 = __importDefault(require("../../models/Player"));
const Players_1 = __importDefault(require("../../services/players/Players"));
const Identificator_1 = __importDefault(require("../../services/Identificator"));
class AuthWelcome {
    constructor(eventBus) {
        this.handle = (message) => {
            if (Stage_1.default.current() !== Stage_1.stages.AWAITING_FOR_PLAYERS) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'auth_welcome-error',
                        payload: {
                            error: 'Queue stage has ended'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            if (Players_1.default.isFull()) {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'auth_welcome-error',
                        payload: {
                            error: 'No more space for new players'
                        }
                    }
                };
                this.eventBus.next([response]);
                return;
            }
            const id = Identificator_1.default.generate();
            Players_1.default.add(new Player_1.default(id, message.ws));
            const response = {
                ws: message.ws,
                message: {
                    type: 'auth_welcome-success',
                    payload: {
                        id
                    }
                }
            };
            this.eventBus.next([response]);
        };
        this.eventBus = eventBus;
    }
}
AuthWelcome.type = 'auth_welcome';
exports.default = AuthWelcome;
