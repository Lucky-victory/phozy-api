import { isAuthorized } from "./../utils/index";

import { Request, Response } from "express";
import PhotosModel from "../models/Photos";
import { IPhoto, IPhotoResult } from "./../interfaces/Photos";
import AlbumsModel from "../models/Albums";

export default class PhotosController {
  /**
   * @desc adds new photos to an album
   * @route POST /api/photos/:album_id
   * @param req
   * @param res
   * @returns
   */
  static async createNewPhotos(req: Request, res: Response) {
    try {
      const { photo_urls, auth } = req;
      const { album_id } = req.params;
      const albumId = parseInt(album_id, 10);
      const { alt_text } = req.body;
      if (!(parseInt(album_id) && photo_urls?.length)) {
        res.status(400).json({
          message: "please provide 'album_id' and at least 1 image",
        });
        return;
      }
      // check if an album with the specified id exist
      const albumExist = await AlbumsModel.findByIdWithAuth(albumId);
      if (!albumExist) {
        res.status(404).json({
          message: `album with id '${album_id}' does not exist`,
        });
        return;
      }
      const hasAccess = isAuthorized(albumExist, auth.user);
      if (!hasAccess) {
        res.status(401).json({
          message: "Unauthorized, don't have access to this resource",
        });
        return;
      }
      const newPhotos: IPhoto[] = photo_urls.map((photo_url) => {
        return {
          url: photo_url,
          alt_text,
          album_id: albumId,
          user_id: auth?.user?.id,
        };
      });

      await PhotosModel.create(newPhotos);

      res.status(201).json({
        data: newPhotos,
        message: "photos added successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "an error occurred",
        error,
      });
    }
  }
  /**
   * @desc
   * @route DELETE /api/photos/:photo_id
   * @param req
   * @param res
   * @returns
   */
  static async deleteItem(req: Request, res: Response) {
    try {
      const { auth } = req;
      const { photo_id } = req.params;
      const photoId = parseInt(photo_id, 10);
      const photo = (await PhotosModel.findById(photoId)) as IPhotoResult;
      if (!photo) {
        res.status(404).json();
        return;
      }
      const hasAccess = isAuthorized(photo, auth.user);
      if (!hasAccess) {
        res.status(401).json({
          message: "Unauthorized, don't have access to this resource",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        message: "An error occcured",
        error,
      });
    }
  }
}
