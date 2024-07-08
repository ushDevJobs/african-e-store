"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImage = exports.uploadStoreImage = exports.uploadUsertImage = exports.sessionMiddleware = exports.corsConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
const express_session_1 = __importDefault(require("express-session"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const MysqlStore = require("express-mysql-session")(express_session_1.default);
exports.corsConfig = {
    origin: [process.env.CLIENT_URL, "http://localhost:2500"],
    credentials: true,
};
const storeOptions = {
    host: process.env.M_HOST,
    user: process.env.M_USERNAME,
    password: process.env.M_PASSWORD || "",
    database: process.env.M_DATABASE,
    port: parseInt(process.env.MYSQL_PORT),
    clearExpired: true,
    checkExpirationInterval: 50000,
    expiration: 1000 * 60 * 60 * 24,
    createDatabaseTable: true,
    connectionLimit: 1,
    endconnectionOnClose: true,
    charset: "utf8mb4_bin",
    schema: {
        tableName: "sessions",
        columnNames: {
            session_id: "session_id",
            expires: "expires",
            data: "data",
        },
    },
};
const sessionStore = new MysqlStore(storeOptions);
exports.sessionMiddleware = (0, express_session_1.default)({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    name: "rayvvin",
    cookie: {
        secure: process.env.NODE_ENV === "production" ? true : "auto",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24,
    },
});
const productImagestorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (0, path_1.resolve)(__dirname, "../../images/product"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `product_image_${uniqueSuffix}_${file.originalname
            .toLowerCase()
            .replace(/ /g, "_")}`);
    },
});
const userImagestorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (0, path_1.resolve)(__dirname, "../../images/user"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `user_${uniqueSuffix}_${file.originalname
            .toLowerCase()
            .replace(/ /g, "_")}`);
    },
});
const storeImagestorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (0, path_1.resolve)(__dirname, "../../images/store"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `store_image_${uniqueSuffix}_${file.originalname
            .toLowerCase()
            .replace(/ /g, "_")}`);
    },
});
exports.uploadUsertImage = (0, multer_1.default)({ storage: userImagestorage });
exports.uploadStoreImage = (0, multer_1.default)({ storage: storeImagestorage });
exports.uploadProductImage = (0, multer_1.default)({ storage: productImagestorage });
