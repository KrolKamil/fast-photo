"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Words {
    constructor() {
        this.getRandomWord = () => {
            return this.words[Math.floor(Math.random() * this.words.length)];
        };
        // this.words = ['Mouse', 'Person']
        this.words = ['Person'];
    }
}
const words = new Words();
exports.default = words;
