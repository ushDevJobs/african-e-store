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

export interface SellerProductsResponse {
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
