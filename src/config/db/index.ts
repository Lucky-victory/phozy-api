import dotenv from "dotenv";
dotenv.config();
import { knex } from "knex";
export const DATABASE_URL = process.env.DATABASE_URL;

const knexInstance = knex(DATABASE_URL as string);
export default knexInstance;
