import { IGeneralResult } from "./../interfaces/General";
import { Response, Request } from "express";
import db from "../config/db";
import { nestObjectProps } from "../utils";
import CacheManager from "../utils/cache-manager";
const generalCache = new CacheManager();

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

      let results!: IGeneralResult[];
      const cachedData = generalCache.get<IGeneralResult[]>("general");

      if (cachedData) {
        results = cachedData as IGeneralResult[];
        res.status(200).json({
          message: "data recieved from cache",
          data: results,
          result_count: results?.length,
        });
        return;
      }
      if (auth && auth.user) {
        results = await GeneralController._findWithAuth(req);
        generalCache.set("general", results);
      } else {
        results = await GeneralController._findWithoutAuth(req);
        generalCache.set("general", results);
      }
      res.status(200).json({
        message: "data retrieved",
        data: results,
        result_count: results?.length,
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
      .orWhere("albums.user_id", "=", auth?.user?.id)
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
}
