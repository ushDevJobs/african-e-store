"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["INVALID_CREDENTIALS"] = 1000] = "INVALID_CREDENTIALS";
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXIST"] = 1002] = "USER_ALREADY_EXIST";
    ErrorCode[ErrorCode["INVALID_EMAIL"] = 1004] = "INVALID_EMAIL";
    ErrorCode[ErrorCode["BAD_REQUEST"] = 2000] = "BAD_REQUEST";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 2002] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 2001] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["NOT_LOGGED_IN"] = 2003] = "NOT_LOGGED_IN";
    ErrorCode[ErrorCode["DUPLICATE_FIELD"] = 2005] = "DUPLICATE_FIELD";
    ErrorCode[ErrorCode["NOT_FOUND"] = 2004] = "NOT_FOUND";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 5000] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["MAIL_ERROR"] = 5002] = "MAIL_ERROR";
    ErrorCode[ErrorCode["FAILED_TO_ADD_PRODUCT"] = 3000] = "FAILED_TO_ADD_PRODUCT";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
