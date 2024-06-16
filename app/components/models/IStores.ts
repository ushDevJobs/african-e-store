export interface AllStoresResoponse {
  id: string;
  name: string;
  description: string;
  image: string | null;
  location: string;
  user: User;
}

export interface User {
  fullname: string;
}