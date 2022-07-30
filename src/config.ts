import { Config } from "./interfaces/common";
import dotenv from "dotenv";
import { isEmpty } from "./utils";
dotenv.config();

const { DATABASE_URL, JWT_SECRET_KEY, JWT_EXPIRATION = "2h", CLOUDINARY_URL } = process.env;
if (isEmpty(DATABASE_URL) && isEmpty(JWT_SECRET_KEY)&& isEmpty(CLOUDINARY_URL)) {
  throw new Error('DATABASE_URL, JWT_SECRET_KEY, and CLOUDINARY_URL are required ')
}
const config: Config = {
  database_url: DATABASE_URL as string,
  jwt_secret_key: JWT_SECRET_KEY as string,
  jwt_expiration: JWT_EXPIRATION,
  cloudinary_url: CLOUDINARY_URL as string,
};


export default config;
