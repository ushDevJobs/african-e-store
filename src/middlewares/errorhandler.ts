import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { HttpException } from "../exceptions/root";

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const status = res.statusCode ? res.statusCode : 500;
  logger.error(err.message, { stack: err.stack });
  res.status(err.statusCode).json({
    status: false,
    message:
      process.env.NODE_ENV !== "production"
        ? err.message.includes("database server")
          ? "Failed to connect to database"
          : err.message
        : "Something went wrong",
    errorCode: err.errorCode,
    errors: err.errors,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
