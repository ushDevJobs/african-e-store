import { StoreDetails } from "./ISellerStore";
import { AverageRating, RatingWithPercent } from "./IStores";

export interface SavedStoreResponse {
  storeDetails: StoreDetails;
  avgRating: AverageRating;
  ratingWithPercent: RatingWithPercent[];
  feedback: number;
  totalItemSold: number;
}