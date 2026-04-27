import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ 
      display: "flex", 
      gap: "15px", 
      padding: "15px", 
      background: "#222",
      color: "#fff"
    }}>
      <Link to="/" style={{ color: "#fff" }}>Inicio</Link>
      <Link to="/juegos" style={{ color: "#fff" }}>Juegos</Link>
      <Link to="/login" style={{ color: "#fff" }}>Login</Link>
      <Link to="/register" style={{ color: "#fff" }}>Registro</Link>
    </nav>
  );
}

export default Navbar;