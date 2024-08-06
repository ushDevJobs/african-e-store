import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { UnprocessableEntity } from "./exceptions/validation";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { DatabaseException } from "./exceptions/datebase-exception";
import { createPrismaError } from "./utils/functions";

export const rootErrorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
        return next(exception);
      }
      if (error instanceof ZodError) {
        exception = new UnprocessableEntity(
          "Unprocessed Entity",
          ErrorCode.UNPROCESSABLE_ENTITY,
          error.issues.map((err) => ({ field: err.path, message: err.message }))
        );
        return next(exception);
      }
      if (error instanceof PrismaClientInitializationError) {
        exception = new InternalException(
          "Unable to connect to database",
          ErrorCode.INTERNAL_EXCEPTION,
          error
        );
        return next(exception);
      }
      const message = createPrismaError(error);
      if (message?.message) {
        exception = new DatabaseException(
          message.message,
          400,
          message.code ? message.code : ErrorCode.BAD_REQUEST,
          error
        );
        return next(exception);
      } else {
        exception = new InternalException(
          error?.message ? error.message : "Something went wrong",
          error?.errorCode ? error.errorCode : ErrorCode.INTERNAL_EXCEPTION,
          error
        );
        return next(exception);
      }
    }
  };
};
