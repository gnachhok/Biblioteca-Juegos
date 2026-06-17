import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/authContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/games", label: "Juegos" },
    { to: "/add-games", label: "Agregar Juegos" },
    !token && { to: "/login", label: "Login" },
    !token && { to: "/register", label: "Registro" },
  ].filter(Boolean);

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        🎮 <span>BibliotecaGamer</span>
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