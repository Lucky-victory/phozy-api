import { createNewUser } from "./../../controllers/sign-up/index";
import { Router } from "express";
const router = Router();

// router.use();

router.post("/", createNewUser);

export default router;
