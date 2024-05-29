import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import http from "http";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { corsConfig, sessionMiddleware } from "./config/configOptions";
import router from "./routes";
import { errorHandler } from "./middlewares/errorhandler";
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
import morgan from "morgan";
import logger from "./utils/logger";
import passport from "passport";
import { initializePassport } from "./config/passport.config";
import flash from "express-flash";

// express middlewarrrrrrrr
process.on("uncaughtException", (error) => {
  if (error.name === "PrismaClientInitializationError") {
    logger.error("Failed to connect to database");
  } else {
    logger.error(error.message, { name: error.name, stack: error.stack });
  }
  process.exit(1);
});
app.set("trust proxy", 1);
app.use(cors(corsConfig));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(flash());
app.use(sessionMiddleware);
app.use(morgan("dev"));
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", router);
app.use(errorHandler);
server.listen(PORT, () => logger.info(`Live on http://localhost:${PORT}`));
