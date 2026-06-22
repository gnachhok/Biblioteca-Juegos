import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/authContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken, user } = useAuth();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };



const links = [
    { to: "/", label: "Inicio" },
    { to: "/games", label: "Juegos" },
    !token && { to: "/login", label: "Login" },
    !token && { to: "/register", label: "Registro" },
    token && (user?.role === "admin" || user?.role === "superadmin") && { to: "/add-games", label: "Agregar Juegos" },
    token && user?.role === "superadmin" && { to: "/super-admin", label: "Super Admin" },
    token && { to: "/mibiblioteca", label: "Mi Biblioteca" },
].filter(Boolean);

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <div className="navbar__brand">
          <img
            src="/IconoPagina.png"
            alt="BibliotecaGamer"
            className="navbar__logo"
          />
</div>
      </div>
      <div className="navbar__links">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`navbar__link ${location.pathname === link.to ? "navbar__link--active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
        {token && (
          <button className="navbar__logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;