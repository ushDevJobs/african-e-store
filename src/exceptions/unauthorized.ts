import { ErrorCode, HttpException } from "./root";

export class UnauthorizedException extends HttpException {
  constructor(
    message: string,
    errorCode: number,
    statusCode = 401,
    errors?: any
  ) {
    super(message, errorCode, statusCode, errors);
  }
}
