import UsersController from "../controllers/Users";
import asyncHandler from "express-async-handler";
import { Router } from "express";
const router = Router();

router.post("/", asyncHandler(UsersController.logInUser));

export default router;
