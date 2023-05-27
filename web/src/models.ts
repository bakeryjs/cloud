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

export interface Container {
  id?: string;
  image?: string;
  name?: string;
  status?: string;
  changedAt?: string;
  localNetworkGateway?: string;
  localNetworkIP?: string;
  ports?: string[];
  serverId?: number;
  serverName?: string;
  serverAddress?: string;
  serverLocation?: string;
}
