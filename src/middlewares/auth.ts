import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) next();
  else {
    next(
      new UnauthorizedException(
        "User not authenticated",
        ErrorCode.NOT_LOGGED_IN,
        403
      )
    );
  }
}
