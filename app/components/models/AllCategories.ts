export type Count = {
  products: number;
};
export type Products = {
  id: string;
  name: string;
  details:string;
  amount: number;
};

export interface CategoriesResponse {
  id: string;
  name: string;
  createdAt: string;
  products: Products[];
  _count: Count;
}
