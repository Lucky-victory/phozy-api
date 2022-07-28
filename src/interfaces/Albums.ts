import { DateType } from "./common";

export interface IAlbum {
  title: string;
  description?: string;
  user_id: number;
  privacy?: number | boolean;
}

export interface IAlbumResult extends IAlbum {
  id?: number;
  created_at?: DateType;
  updated_at?: DateType | null;
}
