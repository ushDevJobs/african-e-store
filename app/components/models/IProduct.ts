import { Favorite } from './IStores';

export interface ProductResponse {
  id: string;
  name: string;
  itemCondition: string;
  salesType: string;
  amount: number;
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
  ratings: Rating[];
  positiveFeeback: number;
}

export interface Rating {
  id: string;
  rating: number;
  review: string;
  productId: string;
  storeId: string;
  userId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreResponse {
  id: string;
  name: string;
  description: string;
  image: null;
  location: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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

export interface AddProductRequest {
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
