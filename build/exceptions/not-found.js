"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const root_1 = require("./root");
class NotFound extends root_1.HttpException {
    constructor(message, errorCode, statusCode = 404) {
        super(message, errorCode, statusCode, null);
    }
}
exports.NotFound = NotFound;
