"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const server_1 = __importDefault(require("./server"));
const socket_1 = __importDefault(require("./socket"));
const runningPort = process.env.PORT || 3000;
const app = () => {
    const app = http_1.createServer(server_1.default());
    socket_1.default(app);
    app.listen(runningPort, () => {
        console.log(`Server staretd at port: ${runningPort}`);
    });
};
app();
