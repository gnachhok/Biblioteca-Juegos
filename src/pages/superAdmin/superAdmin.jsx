import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { jwtDecode } from "jwt-decode";

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

    useEffect(() => {
        fetchUsuarios();
    }, []);

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
        <>
            <style>{`
        .sa-page {
          background: #0b0f1a;
          min-height: calc(100vh - 60px);
          padding: 48px 60px;
          color: #f0f4ff;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .sa-header { margin-bottom: 36px; }
        .sa-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 6px;
        }
        .sa-subtitle { font-size: 14px; color: #7a9bbf; margin: 0; }
        .sa-toast {
          position: fixed;
          bottom: 28px;
          right: 28px;
          padding: 13px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          z-index: 999;
          animation: fadeIn 0.2s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .sa-toast--ok {
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.4);
          color: #34d399;
        }
        .sa-toast--error {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.4);
          color: #f87171;
        }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .sa-table-wrap {
          overflow-x: auto;
          border-radius: 14px;
          border: 1px solid #1e3a5f;
        }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        thead { background: #0d1420; border-bottom: 1px solid #1e3a5f; }
        th {
          padding: 14px 18px;
          text-align: left;
          font-size: 12px;
          font-weight: 700;
          color: #7a9bbf;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        tbody tr { border-bottom: 1px solid #1a2540; transition: background 0.15s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #0d1420; }
        td { padding: 14px 18px; vertical-align: middle; }
        .sa-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: #1e3a5f; display: flex; align-items: center;
          justify-content: center; font-weight: 700; font-size: 14px;
          color: #7ab8f5; flex-shrink: 0;
        }
        .sa-user-cell { display: flex; align-items: center; gap: 12px; }
        .sa-username { font-weight: 600; color: #f0f4ff; }
        .sa-you {
          font-size: 11px; background: #1e3a5f; color: #7ab8f5;
          padding: 1px 7px; border-radius: 10px; margin-left: 6px;
        }
        .sa-email { color: #7a9bbf; }
        .sa-badge {
          display: inline-block; padding: 3px 10px;
          border-radius: 12px; font-size: 12px; font-weight: 700;
        }
        .sa-select {
          padding: 7px 12px; background: #0b0f1a;
          border: 1px solid #1e3a5f; border-radius: 8px;
          color: #f0f4ff; font-size: 13px; font-weight: 600;
          cursor: pointer; outline: none; transition: border-color 0.15s;
        }
        .sa-select:focus { border-color: #3b82f6; }
        .sa-select option { background: #111827; }
        .sa-select:disabled { opacity: 0.5; cursor: not-allowed; }
        .sa-btn-delete {
          padding: 7px 14px; background: transparent;
          border: 1px solid #ef4444; border-radius: 8px;
          color: #ef4444; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .sa-btn-delete:hover:not(:disabled) { background: #ef4444; color: #fff; }
        .sa-btn-delete:disabled { opacity: 0.4; cursor: not-allowed; }
        .sa-empty, .sa-loading, .sa-error {
          text-align: center; padding: 64px 20px; color: #7a9bbf; font-size: 14px;
        }
        .sa-error { color: #f87171; }
        .sa-count { font-size: 13px; color: #7a9bbf; margin-bottom: 14px; }
        @media (max-width: 640px) { .sa-page { padding: 32px 16px; } }
      `}</style>

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
        </>
    );
}

export default SuperAdmin;