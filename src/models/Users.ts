import db from "../config/db";
import { IUserProfile, IUserRecord, IUserResult } from "../interfaces/Users";
import { harpee, HType } from "harpee";
const { MOdel, Schema } = harpee;

const usersSchema = new Schema({
  name: "phozy",
  fields: {
    fullname: HType.string(),
    username: HType.string().required(),
    password: HType.string(),
    email: HType.string().email().required(),
    verified:HType.bool().default(false),
    profile:HType.object({
      image:HType.string(),cover:HType.string()
    }),
    socials:HType.object()
  },
});

export const usersModel=new Model('users',usersSchema);
export default class Users {
  static async findById(
    user_id: number,
    columns = ["fullname", "profile_image", "id", "username"]
  ): Promise<IUserResult | unknown> {
    try {
      const result = await db<IUserResult>("users")
        .column<string[]>(columns)
        .select()
        .where("id", "=", user_id);

      return result[0] as IUserResult;
    } catch (error) {
      return error;
    }
  }
  static async create(new_user: IUserRecord): Promise<number[] | unknown> {
    try {
      const result = await db("users").insert<IUserRecord>(new_user);

      return result;
    } catch (error) {
      return error;
    }
  }
  static async update(
    user: IUserRecord | IUserProfile,
    user_id: number
  ): Promise<IUserResult | unknown> {
    try {
      const result = await db
        .update<IUserRecord>(user)
        .where("id", "=", user_id);
      return result;
    } catch (error) {
      return error;
    }
  }

  static async findByEmail(
    email: string,
    columns: string[] = [],
    merge = true
  ): Promise<IUserResult | unknown> {
    try {
      const initialColumns = ["fullname", "profile_image", "id", "username"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IUserResult>("users")
        .column<string[]>(mergedColumns)
        .select()
        .where("email", "=", email);

      return result[0] as IUserResult;
    } catch (error) {
      return error;
    }
  }
  static async findByUsername(
    username: string,
    columns: string[] = [],
    merge = true
  ): Promise<IUserResult | unknown> {
    try {
      const initialColumns = ["fullname", "profile_image", "id", "username"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IUserResult>("users")
        .column<string[]>(mergedColumns)
        .select()
        .where("username", "=", username);

      return result[0] as IUserResult;
    } catch (error) {
      return error;
    }
  }
  static async find(
    columns: string[] = [],
    limit: number = -1,
    merge = true
  ): Promise<IUserResult | unknown> {
    try {
      const initialColumns = ["fullname", "profile_image", "id", "username"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IUserResult>("users")
        .column<string[]>(mergedColumns)
        .select()
        .limit(limit as number);
      return result as IUserResult[];
    } catch (error) {
      return error;
    }
  }
}
