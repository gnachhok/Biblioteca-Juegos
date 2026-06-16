import { Router } from "express";
import { getAllUsers, getbyID, updateUsers, deleteUser } from "../controllers/user.controllers.js"

const router = Router();

router.get("/users", getAllUsers)
router.get("/users/:id", getbyID)
router.put("/users/:id", updateUsers)
router.delete("/users/:id", deleteUser)

export default router;