import { ErrorCode, HttpException } from "./root";

export class NotFound extends HttpException {
  constructor(message: string, errorCode: ErrorCode, statusCode = 404) {
    super(message, errorCode, statusCode, null);
  }
}
