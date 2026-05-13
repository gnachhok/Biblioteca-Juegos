import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/games", label: "Juegos" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Registro" },
  ];

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
      </div>
    </nav>
  );
}

export default Navbar;