import {
  isAuthorized,
  transformPrivacyToBoolean,
  transformPrivacyToNumber,
} from "./../utils/index";
import { IAlbum, IAlbumResult } from "../interfaces/Albums";
import { Request, Response } from "express";

import AlbumsModel from "../models/Albums";
import UsersModel from "../models/Users";
import PhotosModel from "../models/Photos";
import db from "../config/db";

export default class AlbumsController {
  /**
   * @desc Creates a new album
   * @route POST /api/albums/
   *
   * @param req
   * @param res
   * @returns
   */
  static async createNewAlbum(req: Request, res: Response): Promise<void> {
    try {
      const { auth } = req;
      const { title, privacy, description } = req.body;
      if (!title || title.trim() === "") {
        res.status(400).json({
          message: "title is required",
        });
        return;
      }

      let album: IAlbum = {
        title,
        description,
        privacy,
        user_id: auth?.user?.id,
      };
      album = transformPrivacyToNumber(album) as IAlbum;
      // get the insert id
      const insertId = (await AlbumsModel.create(album)) as number[];
      // query with the insert id
      let insertedAlbum = (await AlbumsModel.findByIdWithAuth(
        insertId[0]
      )) as IAlbumResult;
      insertedAlbum = transformPrivacyToBoolean(insertedAlbum) as IAlbumResult;
      res.status(201).json({
        message: "album successfully created",
        data: insertedAlbum,
      });
    } catch (error) {
      res.status(500).json({
        message: "an error occurred,couldn't create album",
        error,
      });
    }
  }
  /**
   * @desc get public albums or private albums when user is authenticated
   * @route GET /api/albums/
   * @param req
   * @param res
   */
  static async getAlbums(req: Request, res: Response) {
    try {
      const { page = 1, perPage = 10 } = req.query;
      const offset =
        (parseInt(page as string, 10) - 1) * parseInt(perPage as string, 10);
      let albums = await AlbumsModel.find([], perPage as number, offset);
      albums = transformPrivacyToBoolean(
        albums as IAlbumResult[]
      ) as IAlbumResult[];
      res.status(200).json({
        message: "albums retrieved",
        data: albums,
        result_count: albums?.length,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
      });
    }
  }
  /**
   * @desc Retrieves an album by id
   * @route GET /api/albums/:album_id
   * @param req
   * @param res
   * @returns
   */
  static async getAlbumById(req: Request, res: Response): Promise<void> {
    try {
      const { album_id } = req.params;
      const { auth } = req;
      const albumId = parseInt(album_id, 10);
      const { photo_count = 10 } = req.query;
      let album;
      //
      if (auth?.user) {
        album = await AlbumsModel.findByIdWithAuth(albumId);
      } else {
        album = await AlbumsModel.findById(albumId);
      }
      if (!album) {
        res.status(404).json({
          message: `Album with '${album_id}' was not found`,
        });
        return;
      }
      const hasAccess = isAuthorized(album, auth?.user);
      // if the album is private and the current user isn't the owner of the resource
      if (album?.privacy && !hasAccess) {
        res.status(401).json({
          message: "Unauthorized, don't have access to this resource",
        });
        return;
      }
      album = transformPrivacyToBoolean(album) as IAlbumResult;
      // get the user that owns the albums
      const user = await UsersModel.findById(album.user_id);
      // get photos under the albums
      const photos = await PhotosModel.findByAlbumId(
        [albumId],
        [],
        photo_count as number
      );

      res.status(201).json({
        message: "album retrieved",
        data: {
          ...album,
          user,
          photos,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "an error occurred",
        error,
      });
    }
  }

  static async updateAlbum(req: Request, res: Response): Promise<void> {
    try {
      const { album_id } = req.params;
      const { auth } = req;
      const userId = auth?.user?.id;
      const { title, description, privacy } = req.body;

      const albumId = parseInt(album_id, 10);
      // an album record to be updated
      let albumToUpdate: IAlbumResult = {
        updated_at: db.fn.now(6) as unknown as string,
        user_id: userId,
        title,
        description,
      };
      // if privacy is not undefined, add it as a property
      privacy ? (albumToUpdate["privacy"] = privacy) : null;
      albumToUpdate = transformPrivacyToNumber(albumToUpdate) as IAlbumResult;
      const album = await AlbumsModel.findById(albumId);
      if (!album) {
        res.status(404).json({
          message: `Album with '${album_id}' was not found`,
        });
        return;
      }
      const hasAccess = isAuthorized(album, auth?.user);
      if (!hasAccess) {
        res.status(401).json({
          message: "Unauthorized, don't have access to this resource",
        });
        return;
      }

      await AlbumsModel.updateAlbum(albumToUpdate, albumId, userId);

      res.status(200).json({
        message: "album successfully updated",
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occcurred",
        error,
      });
    }
  }
  static async deleteAlbum(req: Request, res: Response): Promise<void> {
    try {
      const { album_id } = req.params;
      const { auth } = req;
      const userId = auth?.user?.id;
      const albumId = parseInt(album_id, 10);

      const album = await AlbumsModel.findById(albumId);
      if (!album) {
        res.status(404).json({
          message: `Album with '${album_id}' was not found`,
        });
        return;
      }
      const hasAccess = isAuthorized(album, auth?.user);
      if (!hasAccess) {
        res.status(401).json({
          message: "Unauthorized, don't have access to this resource",
        });
        return;
      }
      await AlbumsModel.deleteAlbum(albumId, userId);
      res.status(200).json({
        message: "album successfully deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occcurred",
        error,
      });
    }
  }
}
