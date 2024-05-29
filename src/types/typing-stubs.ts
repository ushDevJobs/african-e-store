import "express-session";
declare module "express-session" {
  interface SessionData {
    views: number;
    user: {
      id: string;
      email: string;
      accountType: string;
    };
  }
}
