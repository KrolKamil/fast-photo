"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const AWS_1 = __importDefault(require("./services/AWS"));
const corsOptions = {
    origin: true,
    credentials: true
};
const server = () => {
    const app = express_1.default();
    app.use(cors_1.default(corsOptions));
    app.use(body_parser_1.default.json());
    app.use((error, req, res, next) => {
        res.status(400).json({
            type: 'error',
            message: error.toString() || 'unknown error'
        });
    });
    app.get('/reset', (req, res) => {
        utils_1.resetEverything();
        const timeNow = new Date();
        res.send(`Server has been restarted at: ${timeNow}`);
    });
    app.get('/', (req, res) => {
        res.send(`I'm alive!`);
    });
    // app.get('/load', (req, res) => {
    //   res.sendFile(path.join(`${process.cwd()}/src/html/load.html`));
    // });
    app.post('/load', (req, res) => {
        if (!(req.body.aws_access_key_id) ||
            !(req.body.aws_secret_access_key) ||
            !(req.body.aws_session_token)) {
            return res.json({
                error: 'required: aws_access_key_id, aws_secret_access_key, aws_session_token'
            });
        }
        const config = {
            accessKeyId: req.body.aws_access_key_id,
            secretAccessKey: req.body.aws_secret_access_key,
            sessionToken: req.body.aws_session_token
        };
        AWS_1.default.loadConfig(config);
        return res.json({
            updated: true
        });
    });
    return app;
};
exports.default = server;