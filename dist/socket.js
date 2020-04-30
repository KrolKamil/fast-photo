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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const ws_1 = __importDefault(require("ws"));
const utils_1 = require("./utils");
const message_1 = __importDefault(require("./services/creators/message"));
const Handlers_1 = __importDefault(require("./handlers/Handlers"));
const eventBus_1 = __importDefault(require("./services/eventBus"));
const AuthWelcome_1 = __importDefault(require("./handlers/auth-welcome/AuthWelcome"));
const AuthCheck_1 = __importDefault(require("./handlers/auth-check/AuthCheck"));
const Game_1 = __importDefault(require("./supervisors/game/Game"));
const AWS_1 = __importDefault(require("./services/AWS"));
const PlayerAnswer_1 = __importDefault(require("./handlers/player-answer/PlayerAnswer"));
const PlayerReady_1 = __importDefault(require("./handlers/player-ready/PlayerReady"));
const PlayerWord_1 = __importDefault(require("./handlers/player-word/PlayerWord"));
const StageCurrent_1 = __importDefault(require("./handlers/stage-current/StageCurrent"));
const game = new Game_1.default();
const handlers = new Handlers_1.default({
    [AuthWelcome_1.default.type]: new AuthWelcome_1.default(eventBus_1.default),
    [AuthCheck_1.default.type]: new AuthCheck_1.default(eventBus_1.default),
    [PlayerAnswer_1.default.type]: new PlayerAnswer_1.default(eventBus_1.default),
    [PlayerReady_1.default.type]: new PlayerReady_1.default(eventBus_1.default),
    [PlayerWord_1.default.type]: new PlayerWord_1.default(eventBus_1.default),
    [StageCurrent_1.default.type]: new StageCurrent_1.default(eventBus_1.default)
});
const socket = (server) => {
    const wss = new ws_1.default.Server({ server });
    wss.on('connection', (ws) => {
        if (AWS_1.default.isOperating()) {
            ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const parsedMessage = yield utils_1.parseJsonAsync(message);
                    const updatedMessage = message_1.default(parsedMessage, ws);
                    handlers.handle(updatedMessage);
                }
                catch (e) {
                    ws.send(JSON.stringify({
                        type: 'error_internal',
                        payload: {
                            error: e.message
                        }
                    }));
                }
            }));
        }
        else {
            ws.send(JSON.stringify({
                type: 'error_iternal',
                payload: {
                    message: 'SERVER DOES NOT RECIVED AWS KEYS'
                }
            }));
        }
    });
};
exports.default = socket;
