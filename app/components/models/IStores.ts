export interface AllStoresResponse {
  id: string;
  name: string;
  description: string;
  image: string | null;
  location: string;
  user: User;
}

export interface User {
  fullname: string;
}

export interface StoreDetails {
  name: string;
  id: string;
  description: string;
  image: null;
}

export interface AverageRating {
  rating: number;
}

export interface RatingWithPercent {
  rating: number;
  percentage: number;
}

export interface ASingleStoreResponse {
  storeDetails: StoreDetails;
  avgRating: AverageRating;
  totalRating: number;
  ratingWithPercent: RatingWithPercent[];
  feedback: number;
  totalItemSold: number;
}