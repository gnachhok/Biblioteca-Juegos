import { useState, useEffect } from "react";
import "./addGames.css";
import { useAuth } from "../context/authContext";

const PLATAFORMAS = ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One", "Nintendo Switch", "Mobile"];
const GENEROS = ["Acción", "Aventura", "RPG", "Estrategia", "Deportes", "Terror", "Simulación", "Puzzle", "Indie"];

const initialForm = {
    title: "",
    developer: "",
    gender: "",
    description: "",
    status: "Descargar",
    image: "",
    hoursPlayed: 0,
};

function AddGames() {
    const { token } = useAuth();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [juegos, setJuegos] = useState([]);
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    const validar = () => {
        const nuevosErrores = {};
        if (!form.title.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!form.developer.trim()) nuevosErrores.creador = "El creador es obligatorio.";
        if (!form.description.trim()) nuevosErrores.description = "La descripción es obligatoria.";
        if (!form.gender) nuevosErrores.genero = "Seleccioná un género.";
        return nuevosErrores;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errores[e.target.name]) {
            setErrores({ ...errores, [e.target.name]: undefined });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevosErrores = validar();
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

      
        try {

            const url = editandoId 
                ? `http://localhost:3000/games/${editandoId}` 
                : "http://localhost:3000/games";

            const method = editandoId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (editandoId) {
            setJuegos(juegos.map((j) => (j.id === editandoId ? data : j)));
            } else{
            setJuegos([data, ...juegos])
            }
            setForm(initialForm);
            setErrores({});
            setEnviado(true);
            setTimeout(() => {
                setEnviado(false);
                setMostrarFormulario(false);
                setEditandoId(null);
            }, 1800);
        } catch (error){
            console.error("Error al agregar juego", error);
        }
    }

        const [editandoId, setEditandoId] = useState(null);

    const handleEdit = (juego) => {
        setForm({
            title: juego.title,
            developer: juego.developer,
            gender: juego.gender,
            description: juego.description,
            status: juego.status,
            image: juego.image || "",
            hoursPlayed: juego.hoursPlayed || 0,
        });
        setEditandoId(juego.id);
        setEnviado(false);
        setMostrarFormulario(true);
    };

    const handleCancelar = () => {
        setForm(initialForm);
        setErrores({});
        setMostrarFormulario(false);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/games/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setJuegos(juegos.filter((j) => j.id !== id));
    };

useEffect(() => {
    fetch("http://localhost:3000/games")
        .then(res => res.json())
        .then(data => setJuegos(data));
}, []);


    return (
        <>
            

            <div className="ag-page">
                <div className="ag-header">
                    <div>
                        <h1 className="ag-title">Agregar Juegos</h1>
                        <p className="ag-subtitle">Añadí nuevos juegos a tu biblioteca</p>
                    </div>
                    {!mostrarFormulario && (
                        <button className="ag-btn-add" onClick={() => setMostrarFormulario(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Agregar juego
                        </button>
                    )}
                </div>

                <div className="ag-list-section">
                    {juegos.length === 0 ? (
                        <div className="ag-empty">
                            <div className="ag-empty-icon">🎮</div>
                            <p>Todavía no agregaste ningún juego.<br />Usá el botón de arriba para empezar.</p>
                        </div>
                    ) : (
                        <>
                            <p className="ag-list-title">{juegos.length} juego{juegos.length !== 1 ? "s" : ""} agregado{juegos.length !== 1 ? "s" : ""}</p>
                            <div className="ag-game-list">
                                {juegos.map((j) => (
                                    <div key={j.id} className="ag-game-item">
                                        {j.image ? (
                                            <img src={j.image} alt={j.title} className="ag-game-img" onError={(e) => { e.target.style.display = "none"; }} />
                                        ) : (
                                            <div className="ag-game-img-placeholder">🎮</div>
                                        )}
                                        <div className="ag-game-info">
                                            <p className="ag-game-name">{j.title}</p>
                                            <p className="ag-game-meta">{j.developer}</p>
                                            <div className="ag-game-tags">
                                                <span className="ag-tag">{j.gender}</span>
                                            </div>
                                            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                                                <button className="ag-btn-edit" onClick={() => handleEdit(j)}>Editar</button>
                                                <button className="ag-btn-delete" onClick={() => handleDelete(j.id)}>Eliminar</button>
                                            </div>                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {mostrarFormulario && (
                <div className="ag-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleCancelar(); }}>
                    <div className="ag-modal">
                        <div className="ag-modal-header">
                            <h2 className="ag-modal-title">Nuevo juego</h2>
                            <button className="ag-btn-close" onClick={handleCancelar} aria-label="Cerrar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                            {enviado ? (
                                <div className="ag-success">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    {editandoId ? "¡Juego actualizado exitosamente!" : "¡Juego agregado exitosamente!"}
                                </div>
                            ) : (
                            <form className="ag-form" onSubmit={handleSubmit} noValidate>

                                <div className="ag-field">
                                    <label className="ag-label">Nombre del juego <span>*</span></label>
                                    <input
                                        className={`ag-input${errores.nombre ? " ag-input--error" : ""}`}
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="Ej: The Legend of Zelda"
                                        autoFocus
                                    />
                                    {errores.title && <span className="ag-error-msg">{errores.title}</span>}
                                </div>

                                <div className="ag-field">
                                    <label className="ag-label">developer / Desarrolladora <span>*</span></label>
                                    <input
                                        className={`ag-input${errores.developer ? " ag-input--error" : ""}`}
                                        type="text"
                                        name="developer"
                                        value={form.developer}
                                        onChange={handleChange}
                                        placeholder="Ej: Nintendo, FromSoftware..."
                                    />
                                    {errores.developer && <span className="ag-error-msg">{errores.developer}</span>}
                                </div>

                                <div className="ag-field">
                                    <label className="ag-label">Género <span>*</span></label>
                                    <select
                                        className={`ag-select${errores.gender ? " ag-select--error" : ""}`}
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Seleccionar...</option>
                                        {GENEROS.map((g) => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                    {errores.gender && <span className="ag-error-msg">{errores.gender}</span>}
                                </div>

                                <div className="ag-field">
                                    <label className="ag-label">URL de la carátula <span style={{ color: "#3a5070", fontWeight: 400 }}>(opcional)</span></label>
                                    <input
                                        className="ag-input"
                                        type="url"
                                        name="image"
                                        value={form.image}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                    />
                                    {form.image && (
                                        <img
                                            src={form.image}
                                            alt="Preview"
                                            className="ag-image-preview"
                                            onError={(e) => { e.target.style.display = "none"; }}
                                        />
                                    )}
                                </div>

                                <div className="ag-field">
                                  <label className="ag-label">Descripción <span>*</span></label>
                                  <textarea
                                    className={`ag-input${errores.description ? " ag-input--error" : ""}`}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Descripción del juego..."
                                    rows={3}
                                  />
                                  {errores.description && <span className="ag-error-msg">{errores.description}</span>}
                                  </div>

                                  <div className="ag-field">
                                      <label className="ag-label">Status <span>*</span></label>
                                      <select
                                          className={`ag-select${errores.status ? " ag-select--error" : ""}`}
                                          name="status"
                                          value={form.status}
                                          onChange={handleChange}
                                      >
                                          <option value="Descargar">Descargar</option>
                                          <option value="Instalado">Instalado</option>
                                      </select>
                                  </div>

                                  <div className="ag-field">
                                      <label className="ag-label">Horas jugadas</label>
                                      <input
                                          className="ag-input"
                                          type="number"
                                          name="hoursPlayed"
                                          value={form.hoursPlayed}
                                          onChange={handleChange}
                                          placeholder="0"
                                          min="0"
                                      />
                                  </div>

                                <div className="ag-form-actions">
                                    <button type="button" className="ag-btn-cancel" onClick={handleCancelar}>Cancelar</button>
                                    <button type="submit" className="ag-btn-submit">Guardar juego</button>
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default AddGames;