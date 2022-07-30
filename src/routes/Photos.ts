import { checkIfAuthenticated } from "./../middlewares/Auth";
import { Router } from "express";
const router = Router();
import ImageUploader from "../utils/Image-uploader";
import PhotosController from "../controllers/Photos";
import asyncHandler from "express-async-handler";

router.use(checkIfAuthenticated);
router.post(
  "/:album_id",
  PhotosController.checkIfAlbumExist,
  ImageUploader.upload().array("album_images", 10),
  asyncHandler(ImageUploader.albumImageUpload),
  asyncHandler(PhotosController.createNewPhotos)
);
router.delete("/:photo_id", asyncHandler(PhotosController.deleteItem));
export default router;
