import { getTokenFromHeader, validateToken } from './../../middlewares/index';
import { Router } from "express";
const router = Router();

// router.use();

router.post("/",getTokenFromHeader,validateToken);

export default router;
