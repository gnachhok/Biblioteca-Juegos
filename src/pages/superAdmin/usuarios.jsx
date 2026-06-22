import { useState, useEffect } from "react";
import {useAuth} from "../../context/authContext.jsx";
import "./usuarios.css"

function Usuarios(){
    const { token } = useAuth();
    const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
        fetch("http://localhost:3000/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setUsuarios(data));
    }, [token]);



const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setUsuarios(usuarios.filter((u) => u.id !== id));
}

const handleRoleChange = async (id, nuevoRol) => {
    await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: nuevoRol })
    });

    setUsuarios(usuarios.map((u) => (u.id === id ? { ...u, role: nuevoRol } : u)));
};


return (
    <div className="users-page">
        <h1 className="users-title">Gestión de Usuarios</h1>
        <ul className="users-list">
            {usuarios.map((u) => (
                <li key={u.id} className="users-item">
                    <div className="users-info">
                        <p className="users-name">{u.userName}</p>
                        <p className="users-email">{u.email}</p>
                    </div>
                    <select 
                        className="users-select"
                        value={u.role} 
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        <option value="superadmin">superadmin</option>
                    </select>
                    <button className="users-btn-delete" onClick={() => handleDelete(u.id)}>
                        Eliminar
                    </button>
                </li>
            ))}
        </ul>
    </div>
);  

}






export default Usuarios;