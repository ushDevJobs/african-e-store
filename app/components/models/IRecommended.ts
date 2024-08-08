export interface RecommendedResponse {
  id:string;
  coverImage:string;
  amount: number;
  name: string;
}
export interface ReviewedProductResponse {
  product: {
    id: string;
    coverImage: string;
    amount: number;
    name: string;
  };
}
