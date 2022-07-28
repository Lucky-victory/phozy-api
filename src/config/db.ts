import config from "../config";
import { knex } from "knex";

if (
  typeof config.database_url === "undefined" &&
  typeof config.jwt_secret_key === "undefined"
) {
  throw new Error(
    "DATABASE_URL & JWT_SECRET are required, please provide them in .env file"
  );
}

const knexInstance = knex(config.database_url);
export default knexInstance;
