import { OrderDetails, StatusEnums } from "./ISellerStore";

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
  amount: number;
  orderDetails: UserOrderDetails[];
  datePaid: Date;
}
export interface UserOrderDetails {
  status: StatusEnums;
  quantity: number;
  id:string;
  amount:number;
  shippingFee: number;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  coverImage: string;
  store: Store;
  details: string;
  itemCondition: string;
  views: any[];
  createdAt: Date;
  quantity: number;
}

export interface Store {
  name: string;
  id: string;
  image: string;
}