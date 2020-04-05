"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Players_1 = __importDefault(require("../services/Players"));
const Stage_1 = __importDefault(require("../services/Stage"));
const AWS_1 = __importDefault(require("../services/AWS"));
exports.parseJsonAsync = (jsonString) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(JSON.parse(jsonString));
        });
    });
};
exports.base64ToBuffer = (data) => Buffer.from(data, 'base64');
exports.resetEverything = () => {
    Players_1.default.reset();
    Stage_1.default.reset();
    AWS_1.default.reset();
};
