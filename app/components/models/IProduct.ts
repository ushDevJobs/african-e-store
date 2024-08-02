import { SellerProductsResponse } from './ISellerStore';
import { Favorite } from './IStores';

export interface ProductResponse {
  id: string;
  name: string;
  amount: number;
  itemCondition: string;
  salesType: string;
  quantity: number;
  details: string;
  coverImage: string;
  store: StoreResponse;
  discount: boolean;
  discountPercentage: number;
  images: string[];
  favourite: Favorite[];
  endBiddingDate: null;
  returnPolicy: null;
  ratings: Ratings;
  positiveFeeback: number;
}

export interface Ratings {
  avgRating: number;
  totalRating: number;
  storePositiveFeeback: number;
  productRatings: ProductRatings[];
}

export interface ProductRatings{}

export interface StoreResponse {
  id: string;
  name: string;
  description: string;
  image: null;
  location: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  shippingFee: number;
}

export interface CartItem {
  product: ProductResponse;
  qty: number;
}

export interface Store {
  name: string;
  id: string;
  image: string;
}

export interface Product {
  name: string;
  id: string;
  details: string;
  coverImage: string;
  itemCondition: string;
  store: Store;
}

export interface CartResponse {
  id: string;
  quantity: number;
  product: Product;
}

export interface AddProductRequest extends SellerProductsResponse {
  price: number;
  name: string;
  quantity: number;
  condition: string;
  salesType: string;
  category: string;
  date: string;
  description: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  imageFour: string;
  publish: boolean;
}

export interface StoreSummary {
  income: number;
  stock: number;
  fufilledOrders: number;
  messages: number;
}
