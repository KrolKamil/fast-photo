"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stage_1 = __importDefault(require("../../services/Stage"));
class StageCurrent {
    constructor(eventBus) {
        this.handle = (message) => {
            const response = {
                ws: message.ws,
                message: {
                    type: 'stage_current',
                    payload: {
                        stage: Stage_1.default.current()
                    }
                }
            };
            this.eventBus.next([response]);
            return;
        };
        this.eventBus = eventBus;
    }
}
StageCurrent.type = 'stage_current';
exports.default = StageCurrent;
