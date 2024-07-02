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
  INVALID_EMAIL = 1004,
  BAD_REQUEST = 2000,
  UNPROCESSABLE_ENTITY = 2002,
  UNAUTHORIZED = 2001,
  NOT_LOGGED_IN = 2003,
  DUPLICATE_FIELD = 2005,
  NOT_FOUND = 2004,
  INTERNAL_EXCEPTION = 5000,
  MAIL_ERROR = 5002,
  FAILED_TO_ADD_PRODUCT = 3000,
}
