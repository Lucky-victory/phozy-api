import { getTokenFromHeader, validateToken } from './../../middlewares/index';
import UsersController from '../../controllers/users';
import { Router } from "express";
const router = Router();

// router.use();

router.post("/",getTokenFromHeader,validateToken,UsersController.getUser);

export default router;
