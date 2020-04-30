"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Players_1 = __importDefault(require("../../services/players/Players"));
class AuthCheck {
    constructor(eventBus) {
        this.handle = (message) => {
            if (message.payload && message.payload.id) {
                if (Players_1.default.exists(message.payload.id)) {
                    const response = {
                        ws: message.ws,
                        message: {
                            type: 'auth_check-success'
                        }
                    };
                    this.eventBus.next([response]);
                }
                else {
                    const response = {
                        ws: message.ws,
                        message: {
                            type: 'auth_check-error',
                            payload: {
                                error: 'player does not exist'
                            }
                        }
                    };
                    this.eventBus.next([response]);
                }
            }
            else {
                const response = {
                    ws: message.ws,
                    message: {
                        type: 'auth_check-error',
                        payload: {
                            error: 'id is required'
                        }
                    }
                };
                this.eventBus.next([response]);
            }
        };
        this.eventBus = eventBus;
    }
}
AuthCheck.type = 'autch_check';
exports.default = AuthCheck;
