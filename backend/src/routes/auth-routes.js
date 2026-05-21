import { Router } from "express";
import {register, login} from "../controllers/auth-controllers.js"

const router = Router();


router.post("/login", login)

router.post("/login", (req, res) => {
    res.send("Obteniendo datos login")
})

router.post("/register", register)

router.post("/register", (req, res) => {
    res.send("Registrando Usuario")
})

export default router;