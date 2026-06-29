import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import GameCard from "../../components/gamecard";

function MiBiblioteca() {
    const { token, user } = useAuth();
    const [juegos, setJuegos] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user?.id) return;

        fetch(`http://localhost:3000/library/${user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("No se pudo cargar tu biblioteca");
                return res.json();
            })
            .then((data) => {
                setJuegos(Array.isArray(data) ? data : []);
                setError("");
            })
            .catch((err) => {
                setJuegos([]);
                setError(err.message);
            });
    }, [token, user]);

    const handleUpdate = async (id, cambios) => {
        const juegoActual = juegos.find((j) => j.id === id);

        if (!juegoActual) return;

        const response = await fetch(`http://localhost:3000/library/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                hoursPlayed: juegoActual.hoursPlayed,
                status: juegoActual.status,
                ...cambios,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.mensaje || "No se pudo actualizar el juego");
            return;
        }

        setError("");
        setJuegos(
            juegos.map((j) => (j.id === id ? { ...j, ...data } : j))
        );
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/library/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            setError("No se pudo eliminar el juego");
            return;
        }

        setError("");
        setJuegos(juegos.filter((j) => j.id !== id));
    };

    return (
        <div className="games">
            <div className="games__header">
                <h1 className="games__title">Mi Biblioteca</h1>
                <p className="games__subtitle">
                    {juegos.length} juegos en tu biblioteca
                </p>
            </div>

            {error && <p style={{ color: "#d66" }}>{error}</p>}

            <div className="games__grid">
                {juegos.length === 0 && !error ? (
                    <p style={{ color: "#7a9bbf" }}>
                        No tenés juegos en tu biblioteca todavía.
                    </p>
                ) : (
                    juegos.map((ug) => (
                        <div key={ug.id} className="library-card">
                            <GameCard
                                title={ug.Game?.title}
                                description={ug.Game?.description}
                                image={ug.Game?.image}
                                genre={ug.Game?.gender}
                                developer={ug.Game?.developer}
                            />
                            <div className="library-card__controls">
                                <label>
                                    Horas jugadas
                                    <input
                                        type="number"
                                        min="0"
                                        value={ug.hoursPlayed}
                                        onChange={(e) =>
                                            handleUpdate(ug.id, {
                                                hoursPlayed: Number(e.target.value),
                                            })
                                        }
                                    />
                                </label>

                                <label>
                                    Estado
                                    <select
                                        value={ug.status}
                                        onChange={(e) =>
                                            handleUpdate(ug.id, {
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Descargar">Descargar</option>
                                        <option value="Instalado">Instalado</option>
                                    </select>
                                </label>

                                <button onClick={() => handleDelete(ug.id)}>
                                    Quitar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MiBiblioteca;