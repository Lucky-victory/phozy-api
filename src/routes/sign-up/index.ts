
import { Router } from "express";
import UsersController from "../../controllers/users";
const router = Router();
import asyncHandler from 'express-async-handler';
import ImageUploader from "../../utils/imageUploader";

// router.use();

router.post("/", ImageUploader.upload().single('profile_image'),asyncHandler(UsersController.createNewUser));

export default router;
