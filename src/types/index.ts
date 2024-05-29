export interface RequestUser {
  id: string;
  email: string;
  accountType: "SELLER" | "BUYER" | "ADMIN";
}
