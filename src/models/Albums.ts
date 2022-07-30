import db from "../config/db";
import { IAlbum, IAlbumResult } from "../interfaces/Albums";

export default class Albums {
  static async create(newAlbum: IAlbum): Promise<number[] | undefined> {
    try {
      const result = await db<IAlbumResult>("albums").insert(newAlbum);
      return result as number[];
    } catch (error) {
      console.log(error);
    }
  }
  static async updateAlbum(
    album: IAlbumResult,
    id: number,
    user_id: number
  ): Promise<number | undefined> {
    try {
      const result = await db<IAlbumResult>("albums")
        .update(album)
        .where("id", "=", id)
        .andWhere("user_id", "=", user_id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteAlbum(
    id: number,
    user_id: number
  ): Promise<number | undefined> {
    try {
      const result = await db<IAlbumResult>("albums")
        .del()
        .where("id", "=", id)
        .andWhere("user_id", "=", user_id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id: number): Promise<IAlbumResult | undefined> {
    try {
      const result = await db<IAlbumResult>("albums")
        .select<string[]>("id", "title")
        .column(["id", "title"])
        .where("id", "=", id)
        .andWhere("privacy", "=", 0);

      return result[0] as IAlbumResult;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByIdWithAuth(id: number): Promise<IAlbumResult | undefined> {
    try {
      const result = await db<IAlbumResult>("albums")
        .select("*")
        .where("id", "=", id);

      return result[0] as IAlbumResult;
    } catch (error) {
      console.log(error);
    }
  }
  static async find(
    columns = ["id", "title", "description", "created_at"],
    limit?: number,
    offset?: number
  ): Promise<IAlbumResult[] | undefined> {
    try {
      const result = await db<IAlbumResult>("albums")
        .column<string[]>(columns)
        .where("privacy", "=", 0)
        .limit(limit as number)
        .offset(offset as number);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async findByUserId(
    columns = ["id", "title", "description", "created_at"],
    user_id: number,
    limit?: number,
    offset?: number
  ): Promise<IAlbumResult[] | undefined> {
    try {
      const result = await db<IAlbumResult>("albums")
        .column<string[]>(columns)
        .select()
        .where("user_id", "=", user_id)
        .andWhere("privacy", "=", 0)
        .limit(limit as number)
        .offset(offset as number);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async findByUserIdWithAuth(
    columns = ["id", "title", "description", "created_at"],
    user_id: number,
    limit?: number,
    offset?: number
  ): Promise<IAlbumResult[] | undefined> {
    try {
      const result = await db<IAlbumResult>("albums")
        .column<string[]>(columns)
        .select()
        .where("user_id", "=", user_id)
        .limit(limit as number)
        .offset(offset as number);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
