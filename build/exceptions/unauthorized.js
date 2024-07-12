"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const root_1 = require("./root");
class UnauthorizedException extends root_1.HttpException {
    constructor(message, errorCode, statusCode = 401, errors) {
        super(message, errorCode, statusCode, errors);
    }
}
exports.UnauthorizedException = UnauthorizedException;
