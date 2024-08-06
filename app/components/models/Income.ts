import { StoreOrderResponse } from "./ISellerStore";

export interface IncomeResponse {
  income: Income[];
  transactions: Transactions[];
}

export interface Income {
  amount: number;
  createdAt: string;
}

export interface Status {
  id: string;
  orderId: string;
  storeId: string;
  status: string;
  trackerId: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface Quantity {
  id: string;
  quantity: number;
}

export interface SellerPaymentHistory {
  amount: number;
  createdAt: string;
}

export interface User {
  fullname: string;
  id: string;
  address: string | null;
}

export interface Products {
  name: string;
  amount: number;
  coverImage: string;
}

export interface Transactions extends StoreOrderResponse {
  sellerPaymentHistory: SellerPaymentHistory[];
}
