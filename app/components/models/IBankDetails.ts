export interface BankDetailRequest {
  bank: string;
  accountNumber: string;
}
export interface BankDetailResponse {
  bankDetails: BankDetails
}
export interface BankDetails {
  id: string;
  storeId: string;
  accountNumber: string;
  bank: string;
  nameOnAccount: null;
  updatedAt: string;
  createdAt: string;
}