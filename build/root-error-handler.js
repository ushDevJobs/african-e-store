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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootErrorHandler = void 0;
const root_1 = require("./exceptions/root");
const internal_exception_1 = require("./exceptions/internal-exception");
const zod_1 = require("zod");
const validation_1 = require("./exceptions/validation");
const library_1 = require("@prisma/client/runtime/library");
const datebase_exception_1 = require("./exceptions/datebase-exception");
const functions_1 = require("./utils/functions");
const rootErrorHandler = (method) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof root_1.HttpException) {
                exception = error;
            }
            if (error instanceof zod_1.ZodError) {
                exception = new validation_1.UnprocessableEntity("Unprocessed Entity", root_1.ErrorCode.UNPROCESSABLE_ENTITY, error.issues.map((err) => ({ field: err.path, message: err.message })));
            }
            if (error instanceof library_1.PrismaClientInitializationError) {
                exception = new internal_exception_1.InternalException("Unable to connect to database", root_1.ErrorCode.INTERNAL_EXCEPTION, error);
            }
            const message = (0, functions_1.createPrismaError)(error);
            if (message) {
                exception = new datebase_exception_1.DatabaseException(message, 400, root_1.ErrorCode.BAD_REQUEST, error);
            }
            else {
                exception = new internal_exception_1.InternalException((error === null || error === void 0 ? void 0 : error.message) ? error.message : "Something went wrong", (error === null || error === void 0 ? void 0 : error.errorCode) ? error.errorCode : root_1.ErrorCode.INTERNAL_EXCEPTION, error);
            }
            next(exception);
        }
    });
};
exports.rootErrorHandler = rootErrorHandler;
