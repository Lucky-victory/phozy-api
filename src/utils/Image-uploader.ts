import multer from "multer";
import { v4 as uuidV4 } from "uuid";
import path from "path";

export default class ImageUploader {
  static upload() {
    let photo_url = "";
    const destination = "uploads/";
    const storage = multer.diskStorage({
      destination,
      filename(req, file, callback) {
        const uniqueSuffix: string = Date.now() + "" + uuidV4();
        const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(
          file.originalname
        )}`;
        callback(null, filename);
        photo_url = generateURL(
          req.protocol,
          req.headers?.host as string,
          destination,
          filename
        );

        req.photo_url = photo_url;
      },
    });

    return multer({ storage: storage });
  }

  static uploadMany() {
    const photo_urls: string[] = [];
    const destination = "uploads/";
    const storage = multer.diskStorage({
      destination,
      filename(req, file, callback) {
        const uniqueSuffix: string = Date.now() + "-" + uuidV4();
        const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(
          file.originalname
        )}`;

        callback(null, filename);

        const photo_url = generateURL(
          req.protocol,
          req.headers?.host as string,
          destination,
          filename
        );
        photo_urls.push(photo_url);

        req.photo_urls = photo_urls;
      },
    });

    return multer({ storage: storage });
  }
}

export const generateURL = (
  protocol: string,
  hostname: string,
  folder: string,
  filename: string
): string => {
  return `${protocol}://${hostname}/${folder}${filename}`;
};
