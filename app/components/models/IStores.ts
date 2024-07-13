import { Rating } from './ISellerStore';

export interface AllStoresResponse {
  id: string;
  name: string;
  description: string;
  image: string | null;
  location: string;
  user: User;
  favourite: Favorite[];
}

export interface Favorite {
  id: string;
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
  1: {
    percentage: number;
    total: number;
    rating: number;
  };
  2: {
    percentage: number;
    total: number;
    rating: number;
  };
  3: {
    percentage: number;
    total: number;
    rating: number;
  };
  4: {
    percentage: number;
    total: number;
    rating: number;
  };
  5: {
    percentage: number;
    total: number;
    rating: number;
  };
}

export interface ASingleStoreResponse {
  storeDetails: StoreDetails;
  avgRating: AverageRating;
  ratingWithPercent: Rating[];
  feedback: number;
  totalItemSold: number;
}

export interface Products {
  id: string;
  name: string;
  itemCondition: string;
  salesType: string;
  amount: number;
  quantity: number;
  details: string;
  coverImage: string;
  favourite: Favorite[];
}

export interface StoreCategories {
  id: string;
  name: string;
  products: Products[];
}

export interface StoreProducts {
  categories: StoreCategories[];
}

export interface StoreCategoriesResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}