import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import GameCard from "../components/gamecard";

function MiBiblioteca() {
    const { token, user } = useAuth();
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        fetch(`http://localhost:3000/library/${user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setJuegos(data));
    }, [token, user]);

    return (
        <div className="games">
            <div className="games__header">
                <h1 className="games__title">Mi Biblioteca</h1>
                <p className="games__subtitle">{juegos.length} juegos en tu biblioteca</p>
            </div>
            <div className="games__grid">
                {juegos.length === 0 ? (
                    <p style={{ color: "#7a9bbf" }}>No tenés juegos en tu biblioteca todavía.</p>
                ) : (
                    juegos.map((ug) => (
                        <GameCard
                            key={ug.id}
                            title={ug.Game?.title}
                            description={ug.Game?.description}
                            image={ug.Game?.image}
                            genre={ug.Game?.gender}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default MiBiblioteca;