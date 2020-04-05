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
const welcome_1 = __importDefault(require("./welcome"));
class Auth {
    constructor() {
        this.handle = (message) => __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers.get(message.surfix);
            if (!handler) {
                throw new Error('no handler for message');
            }
            return handler.handle(message);
        });
        this.handlers = new Map();
        this.handlers.set(welcome_1.default.name.toLowerCase(), new welcome_1.default());
    }
}
exports.default = Auth;
