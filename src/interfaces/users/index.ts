import { DateType } from "../common";

export interface IUsers {
  firstname: string;
  lastname?: string;
  profileImage?: string;
  username?: string;
}
export interface IUsersRecord extends IUsers {
  email: string;
  password: string;
}
export interface IUsersResult extends IUsers {
  id: number;
  createdAt?: DateType;
  updatedAt?: DateType | null;
}
