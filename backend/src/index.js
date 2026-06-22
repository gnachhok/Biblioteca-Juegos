import express from "express"
import { PORT, sequelize } from "./config/config.js"
import gamesRoute from "./routes/routes.js"
import Games from "./models/games/games.js"
import User from "./models/user/user.js"
import authRoute from "./routes/auth-routes.js"
import cors from "cors"
import Users from "./routes/user.route.js"
import UserGame from "./models/userGame/userGame.js"
import userGameRoute from "./routes/userGame-routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(gamesRoute);
app.use("/auth", authRoute);
app.use(Users);
app.use(userGameRoute);

UserGame.belongsTo(Games, { foreignKey: "gameId" });
UserGame.belongsTo(User, { foreignKey: "userId" });
Games.hasMany(UserGame, { foreignKey: "gameId" });
User.hasMany(UserGame, { foreignKey: "userId" });

sequelize.sync()
    .then(() => {
        console.log("Tablas Creadas ✅");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al sincronizar:", error);
    });
