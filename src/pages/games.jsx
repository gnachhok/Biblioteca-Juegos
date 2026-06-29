import GameCard from "../components/gamecard";
import "./Games.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";


function Games() {

const [games, setGames] = useState([]);
const { token, user } = useAuth();
const [mensaje, setMensaje] = useState("");
const [tipoMensaje, setTipoMensaje] = useState("");

useEffect(() => {
  fetch("http://localhost:3000/games")
    .then((response) => response.json())
    .then((data) => setGames(data));
}, []);

  const handleAddToLibrary = async (gameId) => {
      const response = await fetch("http://localhost:3000/library", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId: user.id, gameId })
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.mensaje || "Error al agregar");
        setTipoMensaje("error");
        return;
      }

      setMensaje("¡Juego agregado a tu biblioteca!");
      setTipoMensaje("success");
  };

  return (
    <div className="games">
      <div className="games__header">
        <h1 className="games__title">Todos los Juegos</h1>
        <p className="games__subtitle">{games.length} juegos disponibles</p>
      </div>

          <div>
        {mensaje && (
          <div className={`games__toast games__toast--${tipoMensaje}`}>
            {mensaje}
          </div>
        )}
      </div>

      <div className="games__grid">
        {games.map((game) => (
            <div key={game.id}>
                <GameCard
                title={game.title}
                description={game.description}
                image={game.image}
                genre={game.gender}
                developer={game.developer}
              />
            <button
              className="games__add-button"
              onClick={() => handleAddToLibrary(game.id)}
            >
              + Mi biblioteca
            </button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Games;