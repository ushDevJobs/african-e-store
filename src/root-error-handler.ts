import e, { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { UnprocessableEntity } from "./exceptions/validation";

export const rootErrorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      }
      if (error instanceof ZodError) {
        exception = new UnprocessableEntity(
          "Unprocessed Entity",
          ErrorCode.UNPROCESSABLE_ENTITY,
          error.issues.map((err) => ({ field: err.path, message: err.message }))
        );
      } else {
        exception = new InternalException(
          error?.message ? error.message : "Something went wrong",
          error?.errorCode ? error.errorCode : ErrorCode.INTERNAL_EXCEPTION,
          error
        );
      }
      next(exception);
    }
  };
};
