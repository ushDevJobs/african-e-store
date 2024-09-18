export interface RegisterAdminRequest {
  email: string;
  password: string;
  fullname: string;
  confirmPassword: string;
  telephone: string;
  companyToken: string;
  country: string;
  city: string;
}