import { HttpException } from "./root";

export class DatabaseException extends HttpException {
  constructor(message: string, status: number, errorCode: number, errors: any) {
    super(message, errorCode, status, errors);
  }
}
