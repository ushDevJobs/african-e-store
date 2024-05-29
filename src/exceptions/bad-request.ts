import { ErrorCode, HttpException } from "./root";

export class BadRequest extends HttpException {
  constructor(message: string, errorCode: ErrorCode, statusCode = 400) {
    super(message, errorCode, statusCode, null);
    this.message = message;
    this.errorCode = errorCode;
  }
}
