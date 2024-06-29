export interface StoreDetails {
  name: string;
  id: string;
  description: string;
  image: null;
}

export interface AvgRating {
  rating: number;
}

export interface Rating {
  rating: number;
  percentage: number;
  total: number;
}

export interface SellerStoreResponse {
  storeDetails: StoreDetails;
  avgRating: AvgRating;
  ratingWithPercent: Rating[];
  feedback: number;
  totalItemSold: number;
}
