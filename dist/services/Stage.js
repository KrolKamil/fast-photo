"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class Stage {
    constructor(initStages) {
        this.reset = () => {
            this.currentStage.next(exports.stages.AWAITING_FOR_PLAYERS);
        };
        this.observe = () => {
            return this.currentStage.asObservable();
        };
        this.change = (stage) => {
            this.currentStage.next(stage);
        };
        this.current = () => {
            return this.currentStage.getValue();
        };
        this.stages = initStages;
        this.currentStage = new rxjs_1.BehaviorSubject(exports.stages.AWAITING_FOR_PLAYERS);
    }
}
exports.stages = {
    AWAITING_FOR_PLAYERS: 'AWAITING_FOR_PLAYERS',
    GAME: 'GAME',
    GAME_OVER: 'GAME_OVER'
};
const stage = new Stage(exports.stages);
exports.default = stage;
