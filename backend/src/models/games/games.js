import { DataTypes} from "sequelize";
import { sequelize } from "../../config/config.js";

const Game = sequelize.define("Game", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    developer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hoursPlayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Instalado", "Descargar"),
        allowNull: false
    }
})

export default Game;