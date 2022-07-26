import { sign as jwtSign } from "jsonwebtoken";
import { IUsersResult } from "../interfaces/users";

const { JWT_SECRET_KEY } = process.env;

export const generateJwtToken = (user: IUsersResult): string => {
  
  const token = jwtSign(JSON.stringify(user), (JWT_SECRET_KEY as string));

  return token;
};
export const removePropFromObject = (obj:{[key:string]:any},prop:string) => {
  
  obj[prop] ? delete obj[prop] : null;
  return obj;
}