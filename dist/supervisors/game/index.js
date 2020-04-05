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
const Players_1 = __importDefault(require("../../services/Players"));
const utils_1 = require("../../utils");
class Game {
    constructor(wss) {
        this.handleNewStage = (stage) => {
            if ((stage === Stage_1.stages.GAME) && (Players_1.default.getPlayersHaveWords() === false)) {
                Players_1.default.setPlayersWords();
                Players_1.default.informPlayersAboutTheirWords();
            }
            else if (stage === Stage_1.stages.GAME_OVER) {
                this.informAboutWinner();
                utils_1.resetEverything();
            }
        };
        this.informAboutWinner = () => {
            Players_1.default.sendToAll(JSON.stringify({
                type: 'game_over',
                payload: {
                    winner: Players_1.default.getWinner()
                }
            }));
        };
        this.wss = wss;
        Stage_1.default.observe().subscribe(this.handleNewStage);
    }
}
exports.default = Game;
