function Login() {
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Contraseña" />
        <br />
        <button>Ingresar</button>
      </form>
    </div>
  );
}

export default Login;