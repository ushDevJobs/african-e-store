import { RequestUser } from ".";

declare global {
  namespace Express {
    export interface Request {
      user?: RequestUser;
    }
  }
}
