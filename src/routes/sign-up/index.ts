
import { Router } from "express";
import UsersController from "../../controllers/user";
const router = Router();
import asyncHandler from 'express-async-handler';

// router.use();

router.post("/", asyncHandler(UsersController.createNewUser));

export default router;
