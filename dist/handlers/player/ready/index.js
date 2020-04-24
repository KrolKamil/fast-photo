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
const Players_1 = __importDefault(require("../../../services/Players"));
const Stage_1 = __importStar(require("../../../services/Stage"));
class Ready {
    constructor() {
        this.handle = (message) => __awaiter(this, void 0, void 0, function* () {
            if (Stage_1.default.current() !== Stage_1.stages.AWAITING_FOR_PLAYERS) {
                const response = {
                    response: {
                        type: 'auth_welcome-error',
                        payload: {
                            error: 'queue stage has ended'
                        }
                    },
                    to: 'player'
                };
                return response;
            }
            if ((!message.payload.id) || (!message.payload.ready)) {
                throw new Error('required id and ready in payload');
            }
            if (!(typeof message.payload.ready === 'boolean')) {
                const response = {
                    response: {
                        type: 'player_ready-error',
                        payload: {
                            error: 'ready has to be boolean'
                        },
                    },
                    to: 'player'
                };
                return response;
            }
            const player = Players_1.default.exists(message.payload.id);
            if (!player) {
                const response = {
                    response: {
                        type: 'player_ready-error',
                        payload: {
                            error: 'player of id does not exists'
                        },
                    },
                    to: 'player'
                };
                return response;
            }
            Players_1.default.changeReady(message.payload.id, message.payload.ready);
            const response = {
                response: {
                    type: 'player_ready-success'
                },
                to: 'player'
            };
            return response;
        });
    }
}
exports.default = Ready;
;
