import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useState } from "react";
import { useAuth } from "../context/authContext"

function Register() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {setToken} = useAuth()
  const navigate = useNavigate()

        const handleLogin = async (e) =>{
          e.preventDefault()

          const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers:{
              "content-type": ("application/json")
            },
            body: JSON.stringify({userName: nombre, email, password})
          })

          const data = await response.json()
          console.log(data)

          setToken(data)

          navigate("/")
        }
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
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
        </div>

        <div className="auth__field">
          <label className="auth__label">Confirmar Contraseña</label>
          <input
            type="password"
            className="auth__input"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="auth__btn" onClick={handleLogin}>Registrarse</button>

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