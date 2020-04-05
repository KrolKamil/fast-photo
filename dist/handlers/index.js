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
const auth_1 = __importDefault(require("./auth"));
const player_1 = __importDefault(require("./player"));
class Handlers {
    constructor() {
        this.handle = (message) => __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers.get(message.prefix);
            if (!handler) {
                throw new Error('missing handler for message');
            }
            return handler.handle(message);
        });
        this.handlers = new Map();
        this.handlers.set(auth_1.default.name.toLowerCase(), new auth_1.default());
        this.handlers.set(player_1.default.name.toLowerCase(), new player_1.default());
    }
}
exports.default = Handlers;
