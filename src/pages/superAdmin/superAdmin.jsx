import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { jwtDecode } from "jwt-decode";
import "./superAdmin.css";

const ROLES = ["user", "admin", "superadmin"];

function SuperAdmin() {
    const { token } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [cambiandoRol, setCambiandoRol] = useState({});
    const [eliminando, setEliminando] = useState({});
    const [mensaje, setMensaje] = useState(null);

    const miId = token ? jwtDecode(token).id : null;

    const mostrarMensaje = (texto, tipo = "ok") => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 3000);
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("http://localhost:3000/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("No autorizado");

                const data = await res.json();
                setUsuarios(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, [token]);

    const handleCambiarRol = async (usuario, nuevoRol) => {
        if (nuevoRol === usuario.role) return;
        setCambiandoRol((prev) => ({ ...prev, [usuario.id]: true }));
        try {
            const res = await fetch(`http://localhost:3000/users/${usuario.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: nuevoRol }),
            });
            if (!res.ok) throw new Error("Error al actualizar");
            setUsuarios((prev) =>
                prev.map((u) => (u.id === usuario.id ? { ...u, role: nuevoRol } : u))
            );
            mostrarMensaje(`Rol de ${usuario.userName} cambiado a ${nuevoRol}`);
        } catch {
            mostrarMensaje("Error al cambiar el rol", "error");
        } finally {
            setCambiandoRol((prev) => ({ ...prev, [usuario.id]: false }));
        }
    };

    const handleEliminar = async (usuario) => {
        if (!confirm(`¿Eliminár a ${usuario.userName}? Esta acción no se puede deshacer.`)) return;
        setEliminando((prev) => ({ ...prev, [usuario.id]: true }));
        try {
            const res = await fetch(`http://localhost:3000/users/${usuario.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Error al eliminar");
            setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
            mostrarMensaje(`Usuario ${usuario.userName} eliminado`);
        } catch {
            mostrarMensaje("Error al eliminar el usuario", "error");
        } finally {
            setEliminando((prev) => ({ ...prev, [usuario.id]: false }));
        }
    };

    const rolColor = (role) => {
        if (role === "superadmin") return "#f59e0b";
        if (role === "admin") return "#3b82f6";
        return "#7a9bbf";
    };

    return (
            <div className="sa-page">
                <div className="sa-header">
                    <h1 className="sa-title">Panel de Usuarios</h1>
                    <p className="sa-subtitle">Gestioná roles y usuarios registrados</p>
                </div>

                {mensaje && (
                    <div className={`sa-toast sa-toast--${mensaje.tipo}`}>
                        {mensaje.tipo === "ok" ? "✓" : "✗"} {mensaje.texto}
                    </div>
                )}

                {cargando && <div className="sa-loading">Cargando usuarios...</div>}
                {error && <div className="sa-error">⚠ {error} — ¿Tenés permisos de superadmin?</div>}

                {!cargando && !error && (
                    <>
                        <p className="sa-count">{usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}</p>
                        <div className="sa-table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Email</th>
                                        <th>Rol actual</th>
                                        <th>Cambiar rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="sa-empty">No hay usuarios registrados.</td>
                                        </tr>
                                    ) : (
                                        usuarios.map((u) => (
                                            <tr key={u.id}>
                                                <td>
                                                    <div className="sa-user-cell">
                                                        <div className="sa-avatar">{u.userName?.[0]?.toUpperCase() ?? "?"}</div>
                                                        <span className="sa-username">
                                                            {u.userName}
                                                            {u.id === miId && <span className="sa-you">vos</span>}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="sa-email">{u.email}</td>
                                                <td>
                                                    <span className="sa-badge" style={{ color: rolColor(u.role), background: `${rolColor(u.role)}22` }}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <select
                                                        className="sa-select"
                                                        value={u.role}
                                                        disabled={cambiandoRol[u.id] || u.id === miId}
                                                        onChange={(e) => handleCambiarRol(u, e.target.value)}
                                                    >
                                                        {ROLES.map((r) => (
                                                            <option key={r} value={r}>{r}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <button
                                                        className="sa-btn-delete"
                                                        disabled={eliminando[u.id] || u.id === miId}
                                                        onClick={() => handleEliminar(u)}
                                                    >
                                                        {eliminando[u.id] ? "Eliminando..." : "Eliminar"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
    );
}

export default SuperAdmin;