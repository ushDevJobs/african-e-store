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
  ratingWithPercent: RatingWithPercent;
  feedback: number;
  totalItemSold: number;
}

export interface StoreProducts {
  id: string;
  name: string;
  itemCondition: string;
  amount: number;
  quantity: number;
  details: string;
  publish: true;
  coverImage: string;
  images: null;
  returnPolicy: string;
  location: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreCategories {
  id: string;
  name: string;
  products: StoreProducts[];
}

export interface StoreCategoriesResponse {
  categories: StoreCategories[];
}
