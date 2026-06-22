import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config.js";

const UserGame = sequelize.define("UserGame", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hoursPlayed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM("Instalado", "Descargar"),
        defaultValue: "Descargar",
    }
});

export default UserGame;