import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useState } from "react";

const TEXTOS = {
  en: {
    title: "Create Account",
    subtitle: "Start your gamer library",
    nombre: "Name",
    nombrePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@email.com",
    password: "Password",
    confirmPassword: "Confirm Password",
    btn: "Sign Up",
    footerText: "Already have an account?",
    footerLink: "Log in",
    traducir: "Traducir al Español",
  },
  es: {
    title: "Crear Cuenta",
    subtitle: "Empezá tu biblioteca gamer",
    nombre: "Nombre",
    nombrePlaceholder: "Tu nombre",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    btn: "Registrarse",
    footerText: "¿Ya tenés cuenta?",
    footerLink: "Iniciá sesión",
    traducir: "Translate to English",
  },
};

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idioma, setIdioma] = useState("en");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const t = TEXTOS[idioma];

  const toggleIdioma = () => {
    setIdioma((prev) => (prev === "en" ? "es" : "en"));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

  if (!nombre.trim()) {
    setError(t === TEXTOS.es ? "El nombre es obligatorio" : "Name is required");
    return;
  }

  if (!email.trim()) {
    setError(t === TEXTOS.es ? "El email es obligatorio" : "Email is required");
    return;
  }

  if (!email.includes("@")) {
    setError(t === TEXTOS.es ? "Ingresá un email válido" : "Enter a valid email");
    return;
  }

  if (!password.trim()) {
    setError(t === TEXTOS.es ? "La contraseña es obligatoria" : "Password is required");
    return;
  }

  if (password.length < 6) {
    setError(t === TEXTOS.es ? "La contraseña debe tener al menos 6 caracteres" : "Password must be at least 6 characters");
    return;
  }

    if (password !== confirmPassword) {
      setError(t === TEXTOS.es ? "Las contraseñas no coinciden" : "Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName: nombre, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.mensaje || "Error al registrarse");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="auth">
      <div className="auth__card">

        <button className="auth__lang-btn" onClick={toggleIdioma}>
          🌐 {t.traducir}
        </button>

        <div className="auth__header">
          <span className="auth__icon">🎮</span>
          <h1 className="auth__title">{t.title}</h1>
          <p className="auth__subtitle">{t.subtitle}</p>
        </div>

        <div className="auth__field">
          <label className="auth__label">{t.nombre}</label>
          <input
            type="text"
            className="auth__input"
            placeholder={t.nombrePlaceholder}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="auth__field">
          <label className="auth__label">{t.email}</label>
          <input
            type="email"
            className="auth__input"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth__field">
          <label className="auth__label">{t.password}</label>
          <input
            type="password"
            className="auth__input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="auth__field">
          <label className="auth__label">{t.confirmPassword}</label>
          <input
            type="password"
            className="auth__input"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="auth__error">{error}</p>}
        </div>

        <button className="auth__btn" onClick={handleRegister}>{t.btn}</button>

        <p className="auth__footer">
          {t.footerText}{" "}
          <Link to="/login" className="auth__link">
            {t.footerLink}
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;