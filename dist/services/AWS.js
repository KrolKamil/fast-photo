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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class AmazonWebServices {
    constructor() {
        this.reset = () => {
            this.client = null;
        };
        this.isOperating = () => (this.client === null ? false : true);
        this.loadConfig = (config) => {
            aws_sdk_1.default.config.update(new aws_sdk_1.default.Config({
                region: 'us-east-1',
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
                sessionToken: config.sessionToken
            }));
            this.client = new aws_sdk_1.default.Rekognition();
        };
        this.detectLables = (buffer) => __awaiter(this, void 0, void 0, function* () {
            if (this.client === null) {
                throw new Error('missing aws config');
            }
            const params = {
                Image: {
                    Bytes: buffer
                },
                MaxLabels: 3
            };
            return this.client.detectLabels(params).promise();
        });
        this.client = null;
    }
}
const amazonWebServices = new AmazonWebServices();
exports.default = amazonWebServices;
