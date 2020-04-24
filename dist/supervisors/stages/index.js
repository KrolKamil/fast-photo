"use strict";
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
const Players_1 = __importDefault(require("../../services/Players"));
const Stage_1 = __importStar(require("../../services/Stage"));
class Stages {
    constructor() {
        this.gameStartedMessage = () => {
            return JSON.stringify({
                type: 'stage',
                payload: {
                    name: 'game'
                }
            });
        };
        this.setGameStage = () => {
            Players_1.default.sendToAll(this.gameStartedMessage());
            Stage_1.default.change(Stage_1.stages.GAME);
        };
        this.handleNewPlayersStatuses = (playerStatuses) => {
            if (Stage_1.default.current() === Stage_1.stages.AWAITING_FOR_PLAYERS) {
                if (playerStatuses.length >= 2) {
                    const somePlayerIsNotReady = playerStatuses.includes(false);
                    if (!somePlayerIsNotReady) {
                        this.setGameStage();
                    }
                }
            }
        };
        Players_1.default.getPlayersStatuses().subscribe(this.handleNewPlayersStatuses);
    }
}
exports.default = Stages;
