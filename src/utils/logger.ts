import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";
import path from "path";
dotenv.config({ path: "../.env" });
import winston, { format } from "winston";
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
} else {
  logger.add(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.prettyPrint()),
    })
  );
  logger.add(
    new winston.transports.File({
      filename: "logs/combined.log",
      format: format.combine(format.timestamp(), format.prettyPrint()),
    })
  );
}
export const morganLogger =
  process.env.NODE_ENV === "production"
    ? morgan("combined", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
        stream: fs.createWriteStream(
          path.resolve(__dirname, "../logs/access.log"),
          {
            flags: "a",
          }
        ),
      })
    : morgan("dev");
export default logger;
