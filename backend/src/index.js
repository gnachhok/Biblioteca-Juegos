import express from "express"

import { PORT } from "./config/config.js"

import gamesRoute from "./routes/routes.js"

const app = express();

app.use(express.json());
app.use(gamesRoute);
app.listen(PORT);
console.log(`server listening on port ${PORT}`)