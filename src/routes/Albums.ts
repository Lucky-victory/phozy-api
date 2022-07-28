import { checkIfAuthenticatedOptional } from "./../middlewares/Auth";
import { Router } from "express";
import asyncHandler from "express-async-handler";

import AlbumsController from "../controllers/Albums";
import { checkIfAuthenticated } from "../middlewares/Auth";

const router = Router();

router.get("/", checkIfAuthenticatedOptional, AlbumsController.getAlbums);
router.get("/:album_id",checkIfAuthenticatedOptional, asyncHandler(AlbumsController.getAlbumById));

router.post(
  "/",
  checkIfAuthenticated,
  asyncHandler(AlbumsController.createNewAlbum)
);
router
  .use(checkIfAuthenticated)
  .put("/:album_id", asyncHandler(AlbumsController.updateAlbum))
  .delete("/:album_id", asyncHandler(AlbumsController.deleteAlbum));

export default router;
