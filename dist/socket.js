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
const handlers_1 = __importDefault(require("./handlers"));
const Players_1 = __importDefault(require("./services/Players"));
const stages_1 = __importDefault(require("./supervisors/stages"));
const game_1 = __importDefault(require("./supervisors/game"));
const AWS_1 = __importDefault(require("./services/AWS"));
const socket = (server) => {
    const wss = new ws_1.default.Server({ server });
    const handlers = new handlers_1.default();
    const supervisorStages = new stages_1.default();
    const supervisorGame = new game_1.default(wss);
    wss.on(('connection'), (ws) => {
        ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
            if ((AWS_1.default.isOperating())) {
                try {
                    const parsedMessage = yield utils_1.parseJsonAsync(message);
                    const updatedMessage = message_1.default(parsedMessage, ws);
                    const response = yield handlers.handle(updatedMessage);
                    const stringifiedResponse = JSON.stringify(response.response);
                    switch (response.to) {
                        case 'player': {
                            ws.send(stringifiedResponse);
                            break;
                        }
                        case 'players': {
                            Players_1.default.sendToAll(stringifiedResponse);
                            break;
                        }
                        case 'all': {
                            wss.clients.forEach((client) => {
                                client.send(stringifiedResponse);
                            });
                            break;
                        }
                    }
                }
                catch (e) {
                    ws.send(JSON.stringify({
                        type: 'internal error',
                        payload: {
                            error: e.message
                        }
                    }));
                }
            }
            else {
                ws.send(JSON.stringify({
                    type: 'aws_error',
                    payload: {
                        error: 'missing aws configuration'
                    }
                }));
            }
        }));
    });
};
exports.default = socket;
