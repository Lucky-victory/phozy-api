import { Config } from "./interfaces/common";
import dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL, JWT_SECRET_KEY, JWT_EXPIRATION = "2h" } = process.env;
const config: Config = {
  database_url: DATABASE_URL as string,
  jwt_secret_key: JWT_SECRET_KEY as string,
  jwt_expiration: JWT_EXPIRATION,
};
export default config;
