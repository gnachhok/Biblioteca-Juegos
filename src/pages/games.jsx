import GameCard from "../components/GameCard";
import "./Games.css";
import { useState, useEffect } from "react";




const GENRES = ["Todos", "Acción", "Aventura", "RPG"];

function Games() {

const [games, setGames] = useState([]);

useEffect(() => {
  fetch("http://localhost:3000/games")
    .then((response) => response.json())
    .then((data) => setGames(data));
}, []);



  return (
    <div className="games">
      <div className="games__header">
        <h1 className="games__title">Todos los Juegos</h1>
        <p className="games__subtitle">{games.length} juegos en tu biblioteca</p>
      </div>

      <div className="games__toolbar">
        <div className="games__filters">
          {GENRES.map((genre) => (
            <button key={genre} className={`games__filter ${genre === "Todos" ? "games__filter--active" : ""}`}>
              {genre}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="games__search"
          placeholder="Buscar juego..."
        />
      </div>

      <div className="games__grid">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

export default Games;