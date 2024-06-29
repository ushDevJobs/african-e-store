export interface ProductResponse {
  id: string;
  name: string;
  itemCondition: string;
  amount: number;
  quantity: number;
  details: string;
  publish: boolean;
  coverImage: string;
  images: string[];
  returnPolicy: string;
  location: null;
  storeId: string;
  shippingDetails: ShippingDetails;
  discount: boolean;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingDetails {
}

export interface CartItem {
  product: ProductResponse;
  qty: number;
}

export interface Store {
  name: string;
  id: string;
  image: string;
}

export interface Product {
  name: string;
  id: string;
  details: string;
  coverImage: string;
  itemCondition: string;
  store: Store;
}

export interface CartResponse {
  id: string;
  quantity: number;
  product: Product;
}
