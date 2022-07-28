import { DateType } from "./common";

export interface IUser {
  fullname: string;
  profile_image?: string;
  username: string;
}
export interface IUserRecord extends IUser {
  email: string;
  password: string;
}
export interface IUserResult extends IUser {
  id: number;
  created_at?: DateType;
  updated_at?: DateType | null;
}
