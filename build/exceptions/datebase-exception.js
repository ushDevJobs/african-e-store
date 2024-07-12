"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseException = void 0;
const root_1 = require("./root");
class DatabaseException extends root_1.HttpException {
    constructor(message, status, errorCode, errors) {
        super(message, errorCode, status, errors);
    }
}
exports.DatabaseException = DatabaseException;
