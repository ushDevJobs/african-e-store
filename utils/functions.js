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
exports.formatTimeAgo = exports.convertToString = exports.checkIfEmpty = exports.generateRandomNumbers = exports.escape = exports.isValidated = exports.format_text = exports.returnJSONError = exports.returnJSONSuccess = exports.sendEmail = exports.extractFullUrlUer = exports.extractFullUrlStore = exports.extractFullUrlProducts = exports.generateRandomId = exports.createPrismaError = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
dotenv_1.default.config({ path: "../.env" });
const nodemailer_1 = __importDefault(require("nodemailer"));
const library_1 = require("@prisma/client/runtime/library");
// import { SendMail, cash, people, settings, tasks } from "../types";
const createPrismaError = (error) => {
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        let errorMessage;
        switch (error.code) {
            case "P2002":
                errorMessage = "Cannot create multiple product with same name";
                break;
            case "P2025":
                errorMessage = "Record not found";
                break;
            default:
                errorMessage = "Unable to perform request";
        }
        return errorMessage;
    }
    if (error instanceof library_1.PrismaClientValidationError) {
        return "Invalid Data Sent";
    }
    return null;
};
exports.createPrismaError = createPrismaError;
const generateRandomId = function () {
    let randomValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return randomValues
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");
};
exports.generateRandomId = generateRandomId;
const extractFullUrlProducts = (req) => {
    return `${req.protocol}://${req["headers"].host}/images/product/`;
};
exports.extractFullUrlProducts = extractFullUrlProducts;
const extractFullUrlStore = (req) => {
    return `${req.protocol}://${req["headers"].host}/images/store/`;
};
exports.extractFullUrlStore = extractFullUrlStore;
const extractFullUrlUer = (req) => {
    return `${req.protocol}://${req["headers"].host}/images/store/`;
};
exports.extractFullUrlUer = extractFullUrlUer;
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS,
    },
});
const sendEmail = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (from = "Ush Engineering Team", subject, to, html) {
    const mailOptions = {
        from: from + " <ushengineering@gmail.com>",
        to,
        subject,
        html,
    };
    try {
        const result = yield transporter.sendMail(mailOptions);
        return {
            status: true,
            message: result,
        };
    }
    catch (error) {
        return {
            status: false,
            message: error,
        };
    }
});
exports.sendEmail = sendEmail;
const returnJSONSuccess = (responseObject, rest, status = 200) => {
    responseObject.status(status);
    return responseObject.json(Object.assign({ status: true, message: "Successful" }, rest));
};
exports.returnJSONSuccess = returnJSONSuccess;
const returnJSONError = (responseObject, rest, status = 400) => {
    responseObject.status(status);
    responseObject.json(Object.assign({ status: false, message: "Error: An error occurred" }, rest));
};
exports.returnJSONError = returnJSONError;
const format_text = (text) => { var _a; return (_a = text === null || text === void 0 ? void 0 : text.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase(); };
exports.format_text = format_text;
const isValidated = (result) => result.length > 0;
exports.isValidated = isValidated;
const escape = (value) => mysql_1.default.escape(value);
exports.escape = escape;
const generateRandomNumbers = (repeatNumber = 4) => Math.floor(Math.random() * parseInt("9".repeat(repeatNumber)));
exports.generateRandomNumbers = generateRandomNumbers;
const checkIfEmpty = (values) => {
    let errors = [];
    values.forEach((value) => {
        let objValues = Object.values(value)[0] || null;
        if (objValues === "" ||
            objValues === null ||
            objValues === undefined ||
            objValues.length <= 0) {
            let objKey = Object.keys(value);
            errors.push(`${objKey[0]} is required`);
        }
    });
    return errors;
};
exports.checkIfEmpty = checkIfEmpty;
const convertToString = (date) => new Date(date).toJSON().slice(0, 10);
exports.convertToString = convertToString;
const formatTimeAgo = (date) => {
    let formatter = new Intl.RelativeTimeFormat(undefined, {
        numeric: "auto",
    });
    const DIVISION = [
        { amount: 60, name: "seconds" },
        { amount: 60, name: "minutes" },
        { amount: 24, name: "hours" },
        { amount: 7, name: "days" },
        { amount: 4.34524, name: "weeks" },
        { amount: 12, name: "months" },
        { amount: Number.POSITIVE_INFINITY, name: "years" },
    ];
    let duration = (date.valueOf() - new Date().valueOf()) / 1000;
    for (let i = 0; i < DIVISION.length; i++) {
        const division = DIVISION[i];
        if (Math.abs(duration) < division.amount) {
            // @ts-ignore
            return formatter.format(Math.round(duration), division.name);
        }
        duration /= division.amount;
    }
};
exports.formatTimeAgo = formatTimeAgo;
