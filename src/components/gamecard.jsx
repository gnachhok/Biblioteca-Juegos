import "./GameCard.css";

function GameCard({ title, description, image, genre }) {
    return (
    <div className="game-card">
        <div className="game-card__img-wrapper">
        <img src={image} alt={title} className="game-card__img" />
        {genre && <span className="game-card__genre">{genre}</span>}
        </div>
        <div className="game-card__body">
        <h3 className="game-card__title">{title}</h3>
        <p className="game-card__desc">{description}</p>
        </div>
    </div>
);
}

export default GameCard;