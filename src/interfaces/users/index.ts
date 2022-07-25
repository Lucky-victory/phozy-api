import { DateType } from "../common";

export interface IUsers {
  firstname?: string;
  lastname?: string;
  profile_image?: string;
  username?: string;
}
export interface IUsersRecord extends IUsers {
  email: string;
  password: string;
}
export interface IUsersResult extends IUsers {
  id: number;
  created_at?: DateType;
  updated_at?: DateType | null; 
}
