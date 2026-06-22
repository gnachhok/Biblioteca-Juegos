import { Router } from "express";
import { getMyGames, addToLibrary, removeFromLibrary } from "../controllers/userGame-controllers.js";
import { verifyToken } from "../middleware/auth.middeware.js";

const router = Router();

router.get("/library/:userId", verifyToken, getMyGames);
router.post("/library", verifyToken, addToLibrary);
router.delete("/library/:id", verifyToken, removeFromLibrary);

export default router;