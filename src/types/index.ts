import "express";

export interface RequestUser {
  id: string;
  email: string;
  accountType: "SELLER" | "BUYER" | "ADMIN";
}

export type OrderStatus = {
  storeId: string;
  status: "PENDING" | "DISPATCHED" | "DELIVERED";
}[];
export type SellerPaid = {
  storeId: string;
  status: boolean;
}[];
export type OrderQuantity = {
  id: string;
  quantity: number;
}[];
declare global {
  namespace PrismaJson {
    type productImage = string[] | [];
    type orderQuantity = OrderQuantity | [];
    type orderStatus = OrderStatus | [];
    type sellerPaid = SellerPaid | [];
  }
}
declare global {
  namespace Express {
    interface Request {
      apicacheGroup?: string;
    }
    interface Locals {
      profit: number;
      storeId?: string;
    }
  }
}
