import db from "../../config/db";
import { IAlbum, IAlbumResult } from "../../interfaces/albums";

export default class Photos {

  static async create(newPhoto: IAlbum): Promise<IAlbumResult | undefined> {
    try {
      const result = await db<IAlbum>("photos").insert<IAlbum>(newPhoto);
      return result as IAlbumResult;
    } catch (error) {
          console.log(error);

    }
  }
  static async update(album: IAlbum): Promise<IAlbumResult | undefined> {
    try {
      const result = await db<IAlbum>("albums").update<IAlbum>(album);
      return result as IAlbumResult;
    } catch (error) {
         console.log(error);

    }
  }

  static async findById(id: number): Promise<IAlbumResult | undefined> {
    try {
      const result = await db<IAlbum>("albums")
        .select("*")
        .where("id", "=", id);

      return result[0] as IAlbumResult;
    } catch (error) {
      console.log(error);
    
    }
  }
  static async find(
    columns = ["id", "title", "description", "coverImage", "created_at"],
    limit?: number
  ): Promise<IAlbumResult[] | undefined> {
    try {
      const result = await db<IAlbumResult[]>("albums")
        .column<string[]>(columns)
        .select()
        .limit(limit as number);
      return result;
    } catch (error) {
      console.log(error);
      
    }
  }
}
