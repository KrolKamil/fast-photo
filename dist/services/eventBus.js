"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const eventBus = new rxjs_1.Subject();
eventBus.subscribe((responses) => {
    responses.forEach((response) => {
        try {
            response.ws.send(JSON.stringify(response.message));
        }
        catch (e) {
            console.log('internal error');
            console.log(e.message);
        }
    });
});
exports.default = eventBus;
