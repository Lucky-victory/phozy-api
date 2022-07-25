import db from "../../config/db";
import { IUsersRecord, IUsersResult } from "./../../interfaces/users/index";

export default class Users {
  static async findById(user_id: number,  columns = ["firstname", "profile_image", "id", "username"]
   ) : Promise<IUsersResult | unknown>{
       try {
      const result = await db<IUsersResult>("users")
        .column<string[]>(columns)
        .select()
        .where("id", "=", user_id);

      return result[0] as IUsersResult;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async create(new_user: IUsersRecord): Promise<IUsersResult | unknown> {
    try {
      console.log(new_user,'model');
      const result = await db("users").insert<IUsersRecord>(new_user);
      
      return result;
    } catch (error) {
      return error;
    }
  }
  static async update(user: IUsersRecord): Promise<IUsersResult | unknown> {
    try {
      const result = await db.update<IUsersRecord>(user);
      return result;
    } catch (error) {
      return error;
    }
  }

  static async findByEmail(
    email: string,
    columns = ["firstname", "profile_image", "id", "username"]
  ): Promise<IUsersResult | unknown> {
    try {
      const result = await db<IUsersResult>("users")
        .column<string[]>(columns)
        .select()
        .where("email", "=", email);

      return result[0] as IUsersResult;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async findByUsername(
    username: string,
    columns = ["firstname", "profile_image", "id", "username"]
  ): Promise<IUsersResult | unknown> {
    try {
      const result = await db<IUsersResult>("users")
        .column<string[]>(columns)
        .select()
        .where("username", "=", username);

      return result[0] as IUsersResult;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async find(
    columns = ["firstname", "profile_image", "id", "username"],
    limit?: number
  ): Promise<IUsersResult[] | unknown> {
    try {
      const result = await db<IUsersResult[]>("users")
        .column<string[]>(columns)
        .select()
        .limit(limit as number);
      return result as IUsersResult[];
    } catch (error) {
      return error;
    }
  }
}
