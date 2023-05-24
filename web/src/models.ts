export interface SignInModel {
  email: string;
  password: string;
}

export interface SignUpModel {
  organization?: string;
  fullName: string;
  email: string;
  password: string;
  country?: string;
}

export interface User {
  fullName?: string;
  email?: string;
  country?: string;
  organization?: string;
}
