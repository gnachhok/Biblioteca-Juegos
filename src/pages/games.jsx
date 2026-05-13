import GameCard from "../components/GameCard";
import "./Games.css";

const GAMES = [
  {
    id: 1,
    title: "God of War",
    description: "Una aventura épica llena de acción y mitología nórdica.",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    genre: "Acción",
  },
  {
    id: 2,
    title: "Spider-Man",
    description: "Balanceate por Nueva York y enfrentá villanos icónicos.",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg",
    genre: "Aventura",
  },
  {
    id: 3,
    title: "Hogwarts Legacy",
    description: "Explorá el mundo mágico y convertite en un gran mago.",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fb/Hogwarts_legacyboxart.png",
    genre: "RPG",
  },
  {
    id: 4,
    title: "The Last of Us",
    description: "Sobreviví en un mundo post-apocalíptico lleno de peligros.",
    image: "https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg",
    genre: "Acción",
  },
  {
    id: 5,
    title: "Elden Ring",
    description: "Explorá un mundo abierto oscuro y desafiante.",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
    genre: "RPG",
  },
  {
    id: 6,
    title: "Red Dead Redemption 2",
    description: "Viví la vida de un forajido en el lejano oeste.",
    image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    genre: "Aventura",
  },
];

const GENRES = ["Todos", "Acción", "Aventura", "RPG"];

function Games() {
  return (
    <div className="games">
      <div className="games__header">
        <h1 className="games__title">Todos los Juegos</h1>
        <p className="games__subtitle">{GAMES.length} juegos en tu biblioteca</p>
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
        {GAMES.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

export default Games;