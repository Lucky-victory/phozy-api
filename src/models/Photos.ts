import { IPhoto, IPhotoResult } from "./../interfaces/Photos";
import db from "../config/db";

export default class Photos {
  static async create(
    newPhoto: IPhoto | IPhoto[]
  ): Promise<number[] | undefined> {
    try {
      const result = await db<IPhoto>("photos").insert(newPhoto);
      return result as number[];
    } catch (error) {
      console.log(error);
    }
  }
  static async updatePhoto(
    photo: IPhoto,
    id: number
  ): Promise<IPhotoResult | undefined> {
    try {
      const result = await db<IPhoto>("photos")
        .update<IPhoto>(photo)
        .where("id", "=", id);
      return result as IPhotoResult;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(
    id: number,
    columns: string[] = [],
    merge = true
  ): Promise<IPhotoResult | unknown> {
    try {
      const initialColumns = ["url", "alt_text", "id", "album_id", "user_id"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IPhotoResult>("photos")
        .column<string[]>(mergedColumns)
        .select()
        .where("id", "=", id);

      return result[0] as IPhotoResult;
    } catch (error) {
      console.log(error);
    }
  }

  static async deletePhoto(
    id: number,
    user_id: number
  ): Promise<number | unknown> {
    try {
      const result = await db<IPhotoResult>("photos")
        .del()
        .where("id", "=", id)
        .andWhere("user_id", "=", user_id);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByAlbumId(
    album_ids: number[],
    columns: string[] = [],
    limit?: number,
    merge = true
  ): Promise<IPhotoResult[] | unknown> {
    try {
      const initialColumns = ["url", "alt_text", "id", "album_id", "user_id"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IPhotoResult>("photos")
        .column<string[]>(mergedColumns)
        .select()
        .whereIn("album_id", album_ids)
        .limit(limit as number);

      return result as IPhotoResult[];
    } catch (error) {
      console.log(error);
    }
  }
  static async find(
    columns: string[] = [],
    limit?: number,
    merge = true
  ): Promise<IPhotoResult | unknown> {
    try {
      const initialColumns = ["url", "alt_text", "id", "album_id", "user_id"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IPhotoResult>("photos")
        .column<string[]>(mergedColumns)
        .select()
        .limit(limit as number);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
