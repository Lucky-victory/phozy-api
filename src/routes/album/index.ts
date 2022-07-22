import { Router } from "express";
const router = Router();

// router.use();

router.get("/", (req, res) => {
  res.send("album route");
});
router.get("/:album_name");

router.post("/");
router.put("/");
router.delete("/:album_name");
export default router;
