import db from "../config/db";
import { ILikesResult, ILikes } from "../interfaces/Likes";

export default class Likes {
  static async create(newLike: ILikes): Promise<number[] | unknown> {
    try {
      const result = await db("likes").insert<ILikes>(newLike);

      return result;
    } catch (error) {
      return error;
    }
  }
  static async findById(id: number): Promise<ILikesResult | unknown> {
    try {
      const result = await db<ILikesResult>("likes")
        .column<string[]>("*")
        .select()
        .where("id", "=", id);

      return result[0] as ILikesResult;
    } catch (error) {
      return error;
    }
  }
  static async deleteItem(
    id: number,
    user_id: number
  ): Promise<number[] | unknown> {
    try {
      const result = await db<ILikesResult>("likes")
        .del()
        .where("id", "=", id)
        .andWhere("user_id", "=", user_id);
      return result;
    } catch (error) {
      return error;
    }
  }
  static async findByPhotoAndUserId(
    photo_id: number,
    user_id: number
  ): Promise<ILikesResult[] | unknown> {
    try {
      const result = await db<ILikesResult>("likes")
        .select()
        .where("photo_id", "=", photo_id)
        .andWhere("user_id", "=", user_id);
      return result;
    } catch (error) {
      return error;
    }
  }
  static async findByPhotoIds(
    photo_ids: number[]
  ): Promise<ILikesResult[] | unknown> {
    try {
      const result = await db<ILikesResult>("likes")
        .select()
        .whereIn("photo_id", photo_ids);
      return result;
    } catch (error) {
      return error;
    }
  }
  static async findTotalByPhotoId(
    photo_ids: number[]
  ): Promise<ILikesResult[] | unknown> {
    try {
      const result = await db<ILikesResult>("likes")
        .select("photo_id")
        .count("id as total_likes")
        .whereIn("photo_id", photo_ids)
        .groupBy("photo_id");
      return result;
    } catch (error) {
      return error;
    }
  }
}
