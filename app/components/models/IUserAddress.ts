export interface UserAddressResponse {
  id: string;
  userId: string;
  houseNumber: null;
  street: string;
  postCode: number;
  city: string;
  country: string;
  updatedAt: string;
  createdAt: string;
}
export interface UserAddressRequest {
  city: string;
  country?: string;
  street: string;
  postCode: number;
}