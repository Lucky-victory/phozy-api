import { DateType } from "./common";

export interface IPhoto {
  url: string;
  user_id: number;
  alt_text?: string;
  album_id: number;
}

export interface IPhotoResult extends IPhoto {
  id: number;
  created_at?: DateType;
  updated_at?: DateType | null;
}
