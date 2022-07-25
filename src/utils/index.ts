import { sign as jwtSign } from "jsonwebtoken";
import { IUsersResult } from "../interfaces/users";

const { JWT_SECRET_KEY } = process.env;

export const generateJwtToken = (user: IUsersResult): string => {
  const token = jwtSign(user, JWT_SECRET_KEY as string);

  return token;
};
