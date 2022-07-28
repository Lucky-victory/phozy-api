import { Router } from "express";
import UsersController from "../controllers/Users";
const router = Router();
import asyncHandler from "express-async-handler";
import ImageUploader from "../utils/Image-uploader";

router.post(
  "/",
  ImageUploader.upload().single("profile_image"),
  asyncHandler(UsersController.createNewUser)
);

export default router;
