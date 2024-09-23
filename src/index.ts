import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { corsConfig, sessionMiddleware } from "./config/configOptions";
import router from "./routes";
import { errorHandler } from "./middlewares/errorhandler";
const app = express();
const PORT = process.env.PORT || 3000;
import morgan from "morgan";
import logger, { morganLogger } from "./utils/logger";
import passport from "passport";
import { initializePassport } from "./config/passport.config";
import flash from "express-flash";
import next from "next";
import path from "path";
import fs from "fs";
import { cache } from "./middlewares/cache";
import { checkRequestType } from "./middlewares/auth";
// express middleware
app.set("trust proxy", 1);
app.use(cors(corsConfig));
app.use(express.json());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"], // modify as needed
//       frameSrc: ["https://js.stripe.com"],
//       imgSrc: ["'self'", "data:", "blob:"],
//     },
//   })
// );
app.use(compression());
app.use(flash());
app.use(sessionMiddleware);
app.use(morganLogger);
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  "/images",
  cache("120 minutes"),
  express.static(path.join(__dirname, "images"))
);
app.use("/api", router);
// if (process.env.NODE_ENV === "production") {
//   const nextApp = next({ dev: false });
//   nextApp.prepare().then(() => {
//     app.all("*", (req, res) => {
//       return nextApp.getRequestHandler()(req, res);
//     });
//   });
// }
app.use(errorHandler);
app.listen(PORT, () => logger.info(`App Live`));
