import User from "../models/user/user.js"

export const getAllUsers = async (req, res) => {
    const users = await User.findAll()
    res.json(users)
}

export const getbyID = async (req, res) => {
    const {id} = req.params

    const user = await User.findByPk(id)

    return res.json(user)
}

export const updateUsers = async (req, res) => {
    const {id} = req.params
    const {userName, email, password, role} = req.body

    await User.update(
        {userName, email, password, role},
        {where: {id: id}}
    );

    const updateUser = await User.findByPk(id)

    return res.json(updateUser)
}

export const deleteUser = async (req, res) => {
    const {id} = req.params
    await User.destroy({
        where: {id: id}
    })

    return res.json({mensaje: "Usuario eliminado"})
}