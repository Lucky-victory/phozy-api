import { Router } from "express";
import asyncHandler from "express-async-handler";

import AlbumController from "../../controllers/album";
import { getTokenFromHeader, validateToken } from "../../middlewares";
const router = Router();

// router.use();

router.get("/", (req, res) => {
  res.send("album route");
});
router.get("/:album_id",asyncHandler(AlbumController.getAlbumById));

router.post("/",getTokenFromHeader,validateToken,asyncHandler(AlbumController.createNewAlbum));
router.put("/");
router.delete("/:album_id");

export default router;
