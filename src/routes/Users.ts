import { Router } from "express";
import asyncHandler from "express-async-handler";
import ImageUploader from "../utils/Image-uploader";

import UsersController from "../controllers/Users";
import { checkIfAuthenticated } from "../middlewares/Auth";
const router = Router();

router.use(checkIfAuthenticated);
router.get("/:username", asyncHandler(UsersController.getUserByUsername));
router.get("/:username/albums", asyncHandler(UsersController.getAlbumsByUser));

// route to update profile image only
router.post(
  "/update/profile-image",asyncHandler(UsersController.checkIfUserExist),
  ImageUploader.upload().single("profile_image"),
  asyncHandler(ImageUploader.profileImageUpload),asyncHandler(UsersController.updateProfileImage)
);

export default router;
