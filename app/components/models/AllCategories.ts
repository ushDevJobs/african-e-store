export type Count = {
  products: number;
};
export type Products = {
  id: string;
  name: string;
  itemCondition: string;
  salesType: string;
  amount: number;
  quantity: number;
  details: string;
  coverImage: string;
  cat_id: string;
  cat_name: string;
  views: any[];
  createdAt: Date;
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
