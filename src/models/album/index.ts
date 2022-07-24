import { IAlbum, IAlbumRecord, IAlbumResult } from "../../interfaces/albums";
import db from "../../config/db";

export default class Albums {
  title!: IAlbum["title"];
  description!: IAlbum["description"];
  userId!: IAlbum["userId"];
  private!: IAlbum["private"];
  coverImage!: IAlbum["coverImage"];
  constructor(album: IAlbum) {
    this.title = album.title;
    this.description = album.description;
    this.userId = album.userId;
    this.private = album.private;
    this.coverImage = album.coverImage;
  }
  static async create(newAlbum: IAlbum): Promise<IAlbum | unknown> {
    try {
      const result = await db<IAlbum>("albums").insert<IAlbum>(newAlbum);
      return result;
    } catch (error) {
      return error;
    }
  }
  static async update(album: IAlbumRecord): Promise<IAlbumResult | unknown> {
    try {
      const result = await db<IAlbum>("albums").update<IAlbum>(album);
      return result;
    } catch (error) {
      return error;
    }
  }

  static async findById(id: number): Promise<IAlbumRecord | unknown> {
    try {
      const result = await db<IAlbumRecord>("albums")
        .select("*")
        .where("id", "=", id);

      return result[0] as IAlbumRecord;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async find(
    columns = ["id", "title", "description", "coverImage", "createdAt"],
    limit?: number
  ): Promise<IAlbumResult[] | unknown> {
    try {
      const result = await db<IAlbumResult[]>("albums")
        .column<string[]>(columns)
        .select()
        .limit(limit as number);
      return result;
    } catch (error) {
      return error;
    }
  }
}
