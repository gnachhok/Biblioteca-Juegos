import GameCard from "../components/GameCard";
import "./Home.css";

const FEATURED_GAMES = [
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
];

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="home__hero">
        <div className="home__hero-glow" />
        <h1 className="home__hero-title">
          Biblioteca <span className="home__hero-accent">Gamer</span>
        </h1>
        <p className="home__hero-subtitle">
          Tu colección de videojuegos favorita
        </p>
        <a href="/games" className="home__hero-cta">
          Explorar juegos →
        </a>
      </section>

      {/* DESTACADOS */}
      <section className="home__section">
        <h2 className="home__section-title">Juegos Destacados</h2>
        <div className="home__cards">
          {FEATURED_GAMES.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home__footer">
        <p>Proyecto Biblioteca Gamer · React + Vite</p>
      </footer>
    </div>
  );
}

export default Home;