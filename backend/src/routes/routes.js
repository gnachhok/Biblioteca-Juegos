import { Router } from "express";

const router = Router();

router.get("/games", (req, res) => {
    res.send("obteniendo juegos")
});

router.get("/games/:id", (req, res) => {
    const {id} = req.params;
    res.send(`obteniendo juego con id: ${id}`);
});

router.post("/games", (rep, res) => {
    res.send("Agregando Juego")
});

router.put("/games/:id", (req, res) =>{
    const { id } = req.params;
    res.send(`Actualizando libro con id: ${id}`);
});

router.delete("/games/:id", (req, res) => {
    const {id} = req.params;
    res.send(`Borrando juego con id: ${id}`);
});

export default router;