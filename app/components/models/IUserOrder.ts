import { StatusEnums } from "./ISellerStore";

export interface Quantity {
  id: string;
  quantity: number;
}

export interface Status {
  id: string;
  orderId: string;
  storeId: string;
  status: StatusEnums;
  trackerId: null;
  updatedAt: string;
  createdAt: string;
}

export interface Store {
  name: string;
  id: string;
  image: string;
}

export interface Products {
  name: string;
  id: string;
  details: string;
  itemCondition: string;
  coverImage: string;
  amount: number;
  store: Store;
}


export interface UserOrderResponse {
  id: string;
  orderId: number;
  quantity: Quantity[];
  amount: number;
  status: Status[];
  products: Products[];
}