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
const PlayersReady_1 = __importDefault(require("../../services/players/players-ready/PlayersReady"));
const PlayersWords_1 = __importDefault(require("../../services/players/players-words/PlayersWords"));
const utils_1 = require("../../utils");
class Game {
    constructor() {
        this.handleGameStart = (allPlayersReady) => {
            if (allPlayersReady && Stage_1.default.current() === Stage_1.stages.AWAITING_FOR_PLAYERS) {
                this.start();
            }
        };
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            Stage_1.default.change(Stage_1.stages.GAME);
            PlayersWords_1.default.setPlayersWords();
            yield PlayersWords_1.default.sendWordsToPlayers();
        });
        this.handleGameEnd = (currentStage) => {
            if (currentStage === Stage_1.stages.GAME_OVER) {
                utils_1.resetSocket();
            }
        };
        PlayersReady_1.default.allReqiredReady().subscribe(this.handleGameStart);
        Stage_1.default.observe().subscribe(this.handleGameEnd);
    }
}
exports.default = Game;
