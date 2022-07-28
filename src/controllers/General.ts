import { IGeneralResult } from "./../interfaces/General";
import { Response, Request } from "express";
import db from "../config/db";
import { nestObjectProps } from "../utils";
import LikesModel from "../models/Likes";

export default class GeneralController {
  /**
   * @desc Query data for public viewing;
   * @route GET /api/
   * @param req
   * @param res
   */
  static async find(req: Request, res: Response) {
    try {
      const { auth } = req;

      let results;
      if (auth && auth.user) {
        results = await GeneralController._findWithAuth(req);
      }
      results = await GeneralController._findWithoutAuth(req);
      res.status(200).json({
        message: "data retrieved",
        data: results,
        result_count: results.length,
      });
    } catch (error) {
      res.status(500).json({
        error,
        message: "an error occurred",
      });
    }
  }
  /**
   * Uses this method when the user is not authenticated;
   * @param req
   */
  private static async _findWithoutAuth(
    req: Request
  ): Promise<IGeneralResult[]> {
    // PAGINATION: get 10 photos per page
    const { page = 1, perPage = 10 } = req.query;
    const perPageLimit = parseInt(perPage as string) || 10;
    const offset = (parseInt(page as string) - 1) * perPageLimit || 0;

    let results = await db("albums")
      .join("users", "albums.user_id", "users.id")
      .join("photos", "albums.id", "photos.album_id")
      .select([
        "photos.id as pid",
        "users.id as uid",
        "users.username",
        "users.fullname",
        "photos.url",
        "photos.album_id",
      ])
      .where("albums.privacy", "=", 0)
      .limit(perPageLimit)
      .offset(offset);

    results = results.map((result) => {
      return nestObjectProps(result, {
        nestedTitle: "user",
        props: ["username", "uid", "fullname"],
      });
    });

    return results as IGeneralResult[];
  }
  /**
   * Uses this method when the user is authenticated;
   * @param req
   */
  private static async _findWithAuth(req: Request): Promise<IGeneralResult[]> {
    // PAGINATION: get 10 photos per page
    const { page = 1, perPage = 10 } = req.query;
    const perPageLimit = parseInt(perPage as string) || 10;
    const offset = (parseInt(page as string) - 1) * perPageLimit || 0;
    const { auth } = req;
    let results = await db("albums")
      .join("users", "albums.user_id", "users.id")
      .join("photos", "albums.id", "photos.album_id")
      .select([
        "photos.id as pid",
        "users.id as uid",
        "users.username",
        "users.fullname",
        "photos.url",
        "photos.album_id",
      ])
      .where("albums.privacy", "=", 0)
      .andWhere("users.id", "=", auth?.user?.id)
      .limit(perPageLimit)
      .offset(offset);

    results = results.map((result) => {
      return nestObjectProps(result, {
        nestedTitle: "user",
        props: ["username", "uid", "fullname"],
      });
    });
    // get photo ids to query likes table
    const photoIds = results.map((result) => result.pid);
    const likes = (await LikesModel.findTotalByPhotoId(photoIds)) as {
      photo_id: number;
      total_likes: number;
    }[];

    // for (const result of results) {
    //   for (const like of likes) {
    //     if (result.pid !== like?.photo_id) {
    //       console.log(like);
    //       result["total_likes"] = 0;
    //     } else {
    //       result["total_likes"] = like?.total_likes;
    //     }
    //   }
    // }
    console.log(likes);

    return results as IGeneralResult[];
  }
}
