import { StatusEnum } from "./IOrderDeliveryStatus";
import { AddProductRequest } from "./IProduct";

export interface StoreDetails {
  name: string;
  id: string;
  description: string;
  image: string;
}
export interface ProfileRequest {
  name: string;
  description: string;
  image: string;
}

export interface AvgRating {
  rating: number;
}

export interface Rating {
  rating: number;
  percentage: number;
  total: number;
}

export interface SellerStoreResponse extends ProfileRequest {
  storeDetails: StoreDetails;
  avgRating: AvgRating;
  ratingWithPercent: Rating[];
  feedback: number;
  totalItemSold: number;
}

export interface SellerProductsResponse{
  id: string;
  name: string;
  itemCondition: string;
  salesType: string;
  endBiddingDate: string;
  amount: number;
  quantity: number;
  details: string;
  publish: boolean;
  coverImage: string;
  images: string[];
  returnPolicy: null;
  location: null;
  storeId: string;
  shippingDetails: '{}';
  discount: false;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface DraftResponse {
  id: string;
  name: string;
  itemCondition: string;
  salesType: string;
  amount: 6;
  quantity: 5;
  details: string;
  coverImage: string;
  images: string[];
  publish: false;
}

export interface StoreOrderResponse {
  id: string;
  amount: number;
  createdAt: string;
  trackingId: string | null;
  quantity: Quantity[];
  status: Status[];
  user: User;
  products: Products[];
  orderId: number;
}

export interface Quantity {
  id: string;
  quantity: number;
}

export interface Products {
  id: string;
  name: string;
  amount: number;
  coverImage: string;
}
export interface Status {
  id: string;
  orderId: string;
  storeId: string;
  createdAt: Date;
  status: StatusEnum;
}

export interface User {
  fullname: string;
  id: string;
  address: string | null;
}
