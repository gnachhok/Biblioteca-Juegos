import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  // CAMBIAR ENTRE true y false PARA PROBAR
  const usuarioLogueado = false;

  const [busqueda, setBusqueda] = useState("");

  const manejarBusqueda = () => {
    if (busqueda.trim() === "") {
      alert("Escribí un juego");
      return;
    }

    // VERIFICACION LOGIN
    if (usuarioLogueado) {
      navigate("/juegos");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        minHeight: "100vh",
        padding: "30px",
        color: "white",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "#173b9c",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Biblioteca Gamer
        </h1>

        <p style={{ fontSize: "18px" }}>
          Tu colección de videojuegos favorita
        </p>
      </div>

      {/* BUSCADOR */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar juego..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "300px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={manejarBusqueda}
          style={{
            padding: "12px 20px",
            backgroundColor: "#00b894",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Buscar
        </button>
      </div>

      {/* JUEGOS DESTACADOS */}
      <div
        style={{
          backgroundColor: "#173b9c",
          padding: "25px",
          borderRadius: "10px",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Juegos Destacados
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* CARD */}
          <div
            style={{
              backgroundColor: "#1f1f1f",
              width: "220px",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
              paddingBottom: "15px",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg"
              alt="God of War"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />

            <h3 style={{ marginTop: "15px" }}>God of War</h3>

            <p style={{ padding: "0 10px", fontSize: "14px" }}>
              Una aventura épica llena de acción y mitología.
            </p>
          </div>

          {/* CARD */}
          <div
            style={{
              backgroundColor: "#1f1f1f",
              width: "220px",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
              paddingBottom: "15px",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg"
              alt="Spider-Man"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />

            <h3 style={{ marginTop: "15px" }}>Spider-Man</h3>

            <p style={{ padding: "0 10px", fontSize: "14px" }}>
              Balanceate por Nueva York y enfrentá villanos icónicos.
            </p>
          </div>

          {/* CARD */}
          <div
            style={{
              backgroundColor: "#1f1f1f",
              width: "220px",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
              paddingBottom: "15px",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/f/fb/Hogwarts_legacyboxart.png"
              alt="Hogwarts Legacy"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />

            <h3 style={{ marginTop: "15px" }}>Hogwarts Legacy</h3>

            <p style={{ padding: "0 10px", fontSize: "14px" }}>
              Explorá el mundo mágico y convertite en un gran mago.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          backgroundColor: "#173b9c",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p>Proyecto Biblioteca Gamer - React</p>
      </div>
    </div>
  );
}

export default Home;