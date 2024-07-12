"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res, next) => {
    var _a;
    const status = typeof err.statusCode === "number" ? err.statusCode : 500;
    logger_1.default.error(err.message, { stack: err.stack });
    if ((_a = err.stack) === null || _a === void 0 ? void 0 : _a.startsWith("PrismaClientInitializationError")) {
        err = {
            message: process.env.NODE_ENV !== "production"
                ? "unable to connect to database"
                : "Something went wrong",
            errorCode: 5000,
            statusCode: 500,
            stack: err.stack,
            name: "Database Error",
            errors: {},
        };
    }
    res.status(status).json({
        status: false,
        message: err.message || "Something went wrong",
        errorCode: err.errorCode,
        errors: err.errors,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
