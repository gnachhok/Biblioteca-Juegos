import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <span className="auth__icon">🎮</span>
          <h1 className="auth__title">Crear Cuenta</h1>
          <p className="auth__subtitle">Empezá tu biblioteca gamer</p>
        </div>

        <div className="auth__field">
          <label className="auth__label">Nombre</label>
          <input
            type="text"
            className="auth__input"
            placeholder="Tu nombre"
          />
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

        <div className="auth__field">
          <label className="auth__label">Confirmar Contraseña</label>
          <input
            type="password"
            className="auth__input"
            placeholder="••••••••"
          />
        </div>

        <button className="auth__btn">Registrarse</button>

        <p className="auth__footer">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="auth__link">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;