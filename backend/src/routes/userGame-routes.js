import { Router } from "express";
import { verifyToken } from "../middleware/auth.middeware.js";
import { getMyGames, addToLibrary, removeFromLibrary, updateLibraryGame } from "../controllers/userGame-controllers.js";

const router = Router();

router.get("/library/:userId", verifyToken, getMyGames);
router.post("/library", verifyToken, addToLibrary);
router.delete("/library/:id", verifyToken, removeFromLibrary);
router.put("/library/:id", verifyToken, updateLibraryGame);

export default router;