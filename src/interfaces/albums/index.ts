import { DateType } from "../common";

export interface IAlbum {
  title: string;
  description?: string;
  userId: number;
  coverImage?: string;
  private?: boolean;
}
export interface IAlbumRecord {
  id: number;
  title?: string;
  description?: string;
  coverImage?: string;
  private?: boolean;
}

export interface IAlbumResult extends IAlbum {
  id: number;
  createdAt?: DateType;
  updatedAt?: DateType | null;
}
