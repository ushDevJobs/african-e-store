import { CorsOptions } from "cors";
import dotenv from "dotenv";
import { Request } from "express";
dotenv.config({ path: "../../.env" });
import session from "express-session";
import multer from "multer";
import { resolve } from "path";
import { BadRequest } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
const MysqlStore = require("express-mysql-session")(session);
export const corsConfig: CorsOptions = {
  origin: [process.env.CLIENT_URL as string, "http://localhost:2500"],
  credentials: true,
};

const storeOptions = {
  host: process.env.M_HOST as string,
  user: process.env.M_USERNAME as string,
  password: (process.env.M_PASSWORD as string) || "",
  database: process.env.M_DATABASE as string,
  port: parseInt(process.env.MYSQL_PORT as string),
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

export const sessionMiddleware = session({
  secret: process.env.SECRET as string,
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
const storage = multer.memoryStorage();
export const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new BadRequest(
          "Only image files are allowed!",
          ErrorCode.BAD_REQUEST,
          400
        )
      );
    }
    cb(null, true);
  },
});
// const productImagestorage = multer.diskStorage({
//   destination: (req: Request, file, cb) => {
//     cb(null, resolve(__dirname, "../../images/product"));
//   },
//   filename: (req: Request, file, cb) => {
//     const uniqueSuffix = Date.now();
//     cb(
//       null,
//       `product_image_${uniqueSuffix}_${file.originalname
//         .toLowerCase()
//         .replace(/ /g, "_")}`
//     );
//   },
// });
const userImagestorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, resolve(__dirname, "../../images/user"));
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(
      null,
      `user_${uniqueSuffix}_${file.originalname
        .toLowerCase()
        .replace(/ /g, "_")}`
    );
  },
});
const storeImagestorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, resolve(__dirname, "../../images/store"));
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(
      null,
      `store_image_${uniqueSuffix}_${file.originalname
        .toLowerCase()
        .replace(/ /g, "_")}`
    );
  },
});
export const uploadUsertImage = multer({ storage: userImagestorage });
export const uploadStoreImage = multer({ storage: storeImagestorage });
