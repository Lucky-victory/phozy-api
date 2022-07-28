import { isAuthorized } from "./../utils/index";
import { Request, Response } from "express";
import { ILikesResult } from "../interfaces/Likes";
import LikesModel from "../models/Likes";
import PhotosModel from "../models/Photos";
import { IPhotoResult } from "../interfaces/Photos";

export default class LikesController {
  /**
   * @desc Like a photo
   * @route POST /api/likes/like/:photo_id
   * @param req
   * @param res
   * @returns
   */
  static async addLike(req: Request, res: Response) {
    try {
      const { photo_id } = req.params;
      const { auth } = req;
      const userId = auth?.user?.id;
      const photoId = parseInt(photo_id, 10);
      const photo = (await PhotosModel.findById(photoId)) as IPhotoResult;
      if (!photo) {
        res.status(404).json({
          message: `Photo with ${photo_id} was not found`,
        });
        return;
      }
      // check if the user already liked that photo
      const result = (await LikesModel.findByPhotoAndUserId(
        photoId,
        userId
      )) as ILikesResult[];
      if (result?.length) {
        res.status(200).send();
        return;
      }
      const newLike = {
        photo_id: photoId,
        user_id: auth?.user.id,
      };
      await LikesModel.create(newLike);

      res.status(201).json({
        message: "photo liked successfully",
        data: newLike,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error,
      });
    }
  }
  /**
   *  @desc Unlike a photo
   * @route POST /api/likes/unlike/:like_id
   * @param req
   * @param res
   * @returns
   */
  static async removeLike(req: Request, res: Response) {
    try {
      const { like_id } = req.params;
      const { auth } = req;
      const userId = auth?.user?.id;
      const likeId = parseInt(like_id, 10);
      const result = (await LikesModel.findById(likeId)) as ILikesResult;
      if (!result) {
        res.status(404).json({
          message: `like with '${likeId}' was not found`,
        });
        return;
      }
      const hasAccess = isAuthorized(result, auth.user);
      if (!hasAccess) {
        res.status(401).json({
          message: "Unauthorized, don't have access to this resource",
        });
        return;
      }
      await LikesModel.deleteItem(likeId, userId);

      res.status(200).json({
        message: "Photo unliked",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error,
      });
    }
  }
}
