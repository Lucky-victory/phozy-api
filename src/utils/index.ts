import randomWords from "random-words";
import slugify from "slugify";
import { IAlbumResult } from "../interfaces/Albums";
import { AuthUser } from "../interfaces/common";
import { ILikesResult } from "../interfaces/Likes";
import { IPhotoResult } from "../interfaces/Photos";
import { IUserRecord } from "../interfaces/Users";

export const removePropFromObject = (
  obj: IUserRecord,
  props: string[]
): IUserRecord => {
  for (const prop of props) {
    obj[prop as keyof IUserRecord]
      ? delete obj[prop as keyof IUserRecord]
      : null;
  }
  return obj as IUserRecord;
};

export const defaultProfileImage =
  "https://images.pexels.com/photos/3494648/pexels-photo-3494648.jpeg?auto=compress&cs=tinysrgb&w=640&h=854&dpr=2";

/**
 * Check if the authenticated user is the owner of the resource
 * @param resource
 * @param user
 * @returns
 */
export const isAuthorized = (
  resource: IAlbumResult | IPhotoResult | ILikesResult,
  user: AuthUser["user"]
): boolean => {
  if (resource && user) {
    return resource?.user_id === user?.id;
  }
  return false;
};

/**
 * Transform privacy as number to boolean
 * @param obj
 * @returns
 */
export const transformPrivacyToBoolean = (
  obj: IAlbumResult | IAlbumResult[]
): IAlbumResult | IAlbumResult[] | void[] => {
  if (Array.isArray(obj)) {
    return obj.map((val) => {
      val.privacy === 0 ? (val.privacy = false) : (val.privacy = true);
      return val;
    });
  }
  obj?.privacy === 0
    ? ((obj.privacy as unknown as boolean) = false)
    : ((obj.privacy as unknown as boolean) = true);
  return obj;
};

/**
 * Transform privacy as boolean to number
 * @param obj
 * @returns
 */
export const transformPrivacyToNumber = (
  obj: IAlbumResult | IAlbumResult[]
): IAlbumResult | IAlbumResult[] | void[] => {
  if (Array.isArray(obj)) {
    return obj.map((val) => {
      String(val.privacy).toLowerCase() === "false"
        ? (val.privacy = 0)
        : (val.privacy = 1);
      return val;
    });
  }
  String(obj?.privacy).toLowerCase() === "false"
    ? ((obj.privacy as unknown as number) = 0)
    : ((obj.privacy as unknown as number) = 1);
  return obj;
};

/**
 * Generate a random username if no username is provided
 * @param username
 */
export const generateUsername = (name?: string): string => {
  let username = name;
  username ? username : randomWords({ exactly: 2, maxLength: 8, join: "-" });
  // transform the username into a lowercase slug
  username = slugify(username as string);
  return username;
};

/**
 * @desc Moves object properties and nest them under a new property
 * @param obj - the object to transform
 * @param options - an object with the title for the nested property and properties to be nested
 * @returns
 */
export const nestObjectProps = (
  obj: { [key: string]: unknown },
  options: { nestedTitle: string; props: string[] }
) => {
  const newObj: { [key: string]: unknown } = {};
  const nestedObj: { [key: string]: unknown } = {};
  const propsToNestObj: { [key: string]: unknown } = {};

  for (const prop of options.props) {
    propsToNestObj[prop] = true;
  }

  for (const key in obj) {
    if (
      propsToNestObj[key] ||
      !Object.prototype.hasOwnProperty.call(obj, key)
    ) {
      nestedObj[key] = obj[key];
      continue;
    }
    newObj[key] = obj[key];
  }
  newObj[options.nestedTitle] = nestedObj;
  return newObj;
};

/**
 * Checks if a value is an empty string or undefined
 * @param val 
 * @returns 
 */
export const isEmpty = (val:unknown):boolean => {
  if (String(val).trim() === '' || typeof val === 'undefined') return true;
  return false;
}