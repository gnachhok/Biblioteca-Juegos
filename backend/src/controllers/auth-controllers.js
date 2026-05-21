import bcrypt from "bcryptjs";
import User from "../models/user/user.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) =>{
    const {userName, email, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword
    })

    res.json({mensaje: "Usuario registrado", user: newUser})

}

export const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({
        where:{
            email
        }
    });

    if (!user)
        return res.status(401).send({mensaje: "Usuario no existe"});

    const comparison = await bcrypt.compare(password, user.password);

    if(!comparison)
        return(res.status(401).send({message: "Email y/o contraseña incorrecta"}));

    const secretKey = "key-secreta2026";

    const token = jwt.sign({email}, secretKey, {expiresIn: "1h"});

    return res.json(token);
}