import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useState } from "react";
import { useAuth } from "../context/authContext";

function Login() {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const {setToken} = useAuth()
        const navigate = useNavigate()
        const [error, setError] = useState("")

        const handleLogin = async (e) => {
            e.preventDefault()

            if (!email.trim()) {
              setError("Ingresá tu email");
              return;
            }

            if (!email.includes("@")) {
              setError("Ingresá un email válido");
              return;
            }

            if (!password.trim()) {
              setError("Ingresá tu contraseña");
              return;
            }

            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.mensaje || data.message || "Error al iniciar sesión")
                return
            }

            setError("")
            setToken(data)
            navigate("/")
        }



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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth__field">
          <label className="auth__label">Contraseña</label>
          <input
            type="password"
            className="auth__input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="auth__error">{error}</p>}
        </div>

        <button className="auth__btn" onClick={handleLogin}>Ingresar</button>

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