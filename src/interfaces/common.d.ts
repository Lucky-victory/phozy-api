import { IUserResult } from "./Users";

export type DateType = string | Date;
export interface Config {
  database_url: string;
  jwt_secret_key: string;
  jwt_expiration?: string;
}

declare global {
  declare namespace Express {
    interface Request {
      auth: AuthUser;
      jwtToken: string;
      photo_url: string;
      photo_urls: string[];
    }
  }
}

export interface AuthUser {
  user: IUserResult;
}
