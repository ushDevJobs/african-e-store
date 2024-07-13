export interface ReviewResponse {
  rating: number;
  review: string;
  id: string;
  user: User;
  product: Product;
}
export interface User {
  fullname: string;
  id: string;
}

export interface Product {
  name: string;
  id: string;
  coverImage: string;
}