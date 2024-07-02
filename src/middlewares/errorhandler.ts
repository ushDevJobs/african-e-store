import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { HttpException } from "../exceptions/root";

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = typeof err.statusCode === "number" ? err.statusCode : 500;
  logger.error(err.message, { stack: err.stack });
  if (err.stack?.startsWith("PrismaClientInitializationError")) {
    err = {
      message:
        process.env.NODE_ENV !== "production"
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
