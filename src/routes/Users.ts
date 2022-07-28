import { Router } from "express";
import asyncHandler from "express-async-handler";

import UsersController from "../controllers/Users";
import { checkIfAuthenticated } from "../middlewares/Auth";
const router = Router();

router.use(checkIfAuthenticated);
router.get("/:username", asyncHandler(UsersController.getUserByUsername));
router.post("/:username/albums", asyncHandler(UsersController.getAlbumsByUser));

export default router;
