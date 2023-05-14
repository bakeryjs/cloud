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
