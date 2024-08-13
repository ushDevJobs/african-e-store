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
export const checkRequestType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.originalUrl.includes("auth"))
    console.log(req.xhr, req.headers["x-requested-with"]);
  if (req.xhr || req.headers["x-requested-with"] === "XMLHttpRequest") {
    next();
  } else {
    res.status(404).send(`
      <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>
Cannot ${req.method} ${req.originalUrl}
</pre>
</body>
</html>`);
  }
};
