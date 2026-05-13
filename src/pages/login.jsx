import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <span className="auth__icon">🎮</span>
          <h1 className="auth__title">Iniciar Sesión</h1>
          <p className="auth__subtitle">Bienvenido de vuelta</p>
        </div>

        <div className="auth__field">
          <label className="auth__label">Email</label>
          <input
            type="email"
            className="auth__input"
            placeholder="tu@email.com"
          />
        </div>

        <div className="auth__field">
          <label className="auth__label">Contraseña</label>
          <input
            type="password"
            className="auth__input"
            placeholder="••••••••"
          />
        </div>

        <button className="auth__btn">Ingresar</button>

        <p className="auth__footer">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="auth__link">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;