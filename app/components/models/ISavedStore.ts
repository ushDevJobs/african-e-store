import { StoreDetails } from "./ISellerStore";
import { AverageRating, RatingWithPercent } from "./IStores";

export interface SavedStoreResponse {
  storeDetails: StoreDetails;
  avgRating: AverageRating;
  ratingWithPercent: RatingWithPercent[];
  feedback: number;
  totalItemSold: number;
}

export interface SavedProductsResponse {
  id: string;
  name: string;
  itemCondition: string;
  salesType: string;
  endBiddingDate: string | null;
  amount: number;
  quantity: number;
  details: string;
  publish: boolean;
  coverImage: string;
  images: string[];
  returnPolicy: string | null;
  location: string | null;
  storeId: string;
  shippingDetails: string;
  discount: boolean;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
  store: Store;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}