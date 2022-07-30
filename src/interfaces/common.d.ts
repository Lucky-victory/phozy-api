import { IUserResult } from "./Users";
import { IAlbumResult } from "./Albums";
export type DateType = string | Date;
export interface Config {
  database_url: string;
  jwt_secret_key: string;
  jwt_expiration?: string;
  cloudinary_url:string
}

declare global {
  declare namespace Express {
    interface Request {
      auth: AuthUser;
      jwtToken: string;
      photo_url: string;
      photo_urls: string[];
album:IAlbumResult
    }
  }
}

export interface AuthUser {
  user: IUserResult;
}
