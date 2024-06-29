export type Count = {
  products: number;
};
export type Products = {
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
  images: 'image1.jpg,image2.jpg';
  returnPolicy: string;
  location: string;
  storeId: string;
  shippingDetails: string;
  discount: boolean;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
};

export interface CategoriesResponse {
  id: string;
  name: string;
  createdAt: string;
  products: Products[];
  _count: Count;
}

export interface SingleProducts {
  id: string;
  name: string;
  itemCondition: string | null;
  amount: number;
  quantity: number;
  details: string;
  publish: true;
  coverImage: string;
  images: string | null;
  returnPolicy: string;
  location: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  name: string;
  products: SingleProducts[];
}
