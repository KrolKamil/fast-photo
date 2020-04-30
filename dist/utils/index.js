"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stage_1 = __importDefault(require("../services/Stage"));
const Players_1 = __importDefault(require("../services/players/Players"));
const PlayersWords_1 = __importDefault(require("../services/players/players-words/PlayersWords"));
const AWS_1 = __importDefault(require("../services/AWS"));
exports.parseJsonAsync = (jsonString) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(jsonString));
        });
    });
};
exports.base64ToBuffer = (data) => Buffer.from(data, 'base64');
exports.resetSocket = () => {
    Stage_1.default.reset();
    Players_1.default.reset();
    PlayersWords_1.default.reset();
};
exports.resetEverything = () => {
    exports.resetSocket();
    AWS_1.default.reset();
};
