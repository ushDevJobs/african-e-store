export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;
  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  INVALID_CREDENTIALS = 1000,
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXIST = 1002,
  INCORRECT_PASSWORD = 1003,
  BAD_REQUEST = 2000,
  UNPROCESSABLE_ENTITY = 2001,
  UNAUTHORIZED = 2001,
  NOT_LOGGED_IN = 2003,
  STORE_NOT_FOUND = 3004,
  INTERNAL_EXCEPTION = 5000,
  MAIL_ERROR = 5002,
}
