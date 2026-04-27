function Register() {
  return (
    <div>
      <h2>Registrarse</h2>
      <form>
        <input type="text" placeholder="Nombre" />
        <br />
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Contraseña" />
        <br />
        <button>Crear cuenta</button>
      </form>
    </div>
  );
}

export default Register;