import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../../config/config.js";

const User = sequelize.define("User" , {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,        
    },

    userName:{
        type: DataTypes.STRING,
        allownull: false,
        unique: true,
    },

    email:{
        type: DataTypes.STRING,
        allowNull : false,
        unique: true,
        validate : {
            isEmail: true
        }
    },

    password:{
        type: DataTypes.STRING,
        allownull: false,
    },

    role:{
    type: DataTypes.ENUM("user", "admin", "superadmin"),
    allowNull: false,
    defaultValue: "user"      
    }
})

export default User;