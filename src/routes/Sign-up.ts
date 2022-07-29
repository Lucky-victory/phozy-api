import { Router } from "express";
import UsersController from "../controllers/Users";
const router = Router();
import asyncHandler from "express-async-handler";

router.post(
  "/",
  asyncHandler(UsersController.createNewUser)
);

export default router;
