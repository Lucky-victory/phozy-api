import { IUsersRecord, IUsersResult } from "./../../interfaces/users/index";
import db from "../../config/db";

export class Users {
  static async create(newUser: IUsersRecord): Promise<IUsersResult | unknown> {
    try {
      const result = await db("users").insert<IUsersRecord>(newUser);
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
    columns = ["firstname", "profileImage", "id", "username"]
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
    columns = ["firstname", "profileImage", "id", "username"]
  ): Promise<IUsersResult | unknown> {
    try {
      const result = await db<IUsersResult>("users")
        .column<string[]>(columns)
        .select()
        .where("email", "=", username);

      return result[0] as IUsersResult;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async find(
    columns = ["firstname", "profileImage", "id", "username"],
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
