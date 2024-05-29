import { ErrorCode, HttpException } from "./root";

export class UnprocessableEnity extends HttpException {
  constructor(message: string, errorCode: number, error: any) {
    super(message, errorCode, 422, error);
  }
}
