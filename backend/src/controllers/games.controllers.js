import Game from "../models/games/games.js"

export const getAllGames = async (req, res) => {
    const games = await Game.findAll()
    res.json(games)
}

export const getbyID = async (req, res) => {
    const {id} = req.params

    const game = await Game.findByPk(id)

    return res.json(game)
}

export const createGame = async (req, res) => {
    const { title, developer, gender, description, status, hoursPlayed, image } = req.body

    const newGame = await Game.create({
        title,
        developer,
        hoursPlayed,
        gender,
        description,
        status,
        image
    })

    return res.json(newGame)
}

export const updateGames = async (req, res) => {
    const {id} = req.params
    const { title, developer, gender, description, status, hoursPlayed, image} = req.body

    await Game.update(
        {title, developer, gender, description, status, hoursPlayed, image},
        {where: {id: id}}
    );
    
    const updatedGame = await Game.findByPk(id)

    return res.json(updatedGame)
}

export const deleteGames = async (req, res) => {
    const {id} = req.params
    await Game.destroy({
        where: {id: id}
    })

    return res.json({mensaje: "Juego eliminado"})
}