import UserGame from "../models/userGame/userGame.js";
import Game from "../models/games/games.js";

export const getMyGames = async (req, res) => {
    const { userId } = req.params;
    const userGames = await UserGame.findAll({
        where: { userId },
        include: [{ model: Game }]
    });
    res.json(userGames);
};

export const addToLibrary = async (req, res) => {
    const { userId, gameId } = req.body;

    const yaExiste = await UserGame.findOne({
        where: { userId, gameId }
    });

    if (yaExiste) {
        return res.status(400).json({ mensaje: "El juego ya está en tu biblioteca" });
    }

    const newEntry = await UserGame.create({ userId, gameId });
    res.json(newEntry);
};

export const removeFromLibrary = async (req, res) => {
    const { id } = req.params;
    await UserGame.destroy({ where: { id } });
    res.json({ mensaje: "Juego eliminado de la biblioteca" });
};

export const updateLibraryGame = async (req, res) => {
    const { id } = req.params;
    const { hoursPlayed, status } = req.body;

    const userGame = await UserGame.findByPk(id);

    if (!userGame) {
        return res.status(404).json({ mensaje: "Juego de biblioteca no encontrado" });
    }

    await userGame.update({
        hoursPlayed,
        status
    });

    res.json(userGame);
};