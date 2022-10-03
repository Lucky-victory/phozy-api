import db from "../config/db";
import { IAlbum, IAlbumResult } from "../interfaces/Albums";
import { harpee, HType } from 'harpee';
const { Model,Schema} = harpee;
import { MyUtils } from "my-node-ts-utils";


const albumsSchema = new Schema({
  name: 'albumsSchema', fields: {
    title: HType.string().required(),
    description: HType.string(),
    is_public: HType.bool().default(true),
    created_at: HType.date().default(MyUtils.currentTime),
    updated_at:HType.date().default()
  }
})
export default class Albums {
  static async create(newAlbum: IAlbum): Promise<number[] | undefined> {
    try {
      const result = await db<IAlbumResult>("albums").insert(newAlbum);
      return result as number[];
    } catch (error) {
  
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
      .column<string[]>(["id", "title"])
      .select("id", "title")
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
    columns = ["id", "title", "description", "created_at","privacy"],
    limit: number=10,
    offset: number=0
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
    columns:string[] = [],
    user_id: number,
    limit: number=10,
    offset: number=0,merge=true
  ): Promise<IAlbumResult[] | undefined> {
    try {
      const initialColumns =["id", "title", "description", "created_at","privacy"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IAlbumResult>("albums")
        .column<string[]>(mergedColumns)
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
 columns:string[] = [],
    user_id: number,
    limit: number=10,
    offset: number=0,merge=true
  ): Promise<IAlbumResult[] | undefined> {
    try {
      const initialColumns =["id", "title", "description", "created_at","privacy"];
      const mergedColumns: string[] = merge
        ? [...columns, ...initialColumns]
        : columns;
      const result = await db<IAlbumResult>("albums")
        .column<string[]>(mergedColumns)
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
