export interface ProductResponse {
  id: string;
  name: string;
  itemCondition: string;
  salesType: string;
  endBiddingDate: string;
  amount: number;
  quantity: number;
  details: string;
  publish: true;
  coverImage: string;
  images: 'image1.jpg,image2.jpg';
  returnPolicy: string;
  location: string;
  storeId: string;
  shippingDetails: string;
  discount: true;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
  store: StoreResponse;
}

export interface StoreResponse {
  id: string;
  name: string;
  description: string;
  image: null;
  location: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
