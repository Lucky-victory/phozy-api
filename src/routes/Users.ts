import { Router } from "express";
import asyncHandler from "express-async-handler";
import ImageUploader from "../utils/Image-uploader";

import UsersController from "../controllers/Users";
import { checkIfAuthenticated } from "../middlewares/Auth";
const router = Router();

router.use(checkIfAuthenticated);
router.get("/:username", asyncHandler(UsersController.getUserByUsername));
router.get("/:username/albums", asyncHandler(UsersController.getAlbumsByUser));

// @todo add update controller 
router.post('/update-profile/profile-image',ImageUploader.upload().single("profile_image"),asyncHandler(ImageUploader.toCloud),)


export default router;
