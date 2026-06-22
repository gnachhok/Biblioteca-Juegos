import { Link } from "react-router-dom";

function NotFound({ tipo = "pagina" }) {
    const esSinAcceso = tipo === "acceso";

    return (
        <>
            <style>{`
        .nf {
          background: #0b0f1a;
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          font-family: 'Segoe UI', system-ui, sans-serif;
          color: #f0f4ff;
        }
        .nf__code {
          font-size: 120px;
          font-weight: 800;
          color: #1e3a5f;
          line-height: 1;
          letter-spacing: -0.04em;
          margin-bottom: 16px;
        }
        .nf__icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .nf__title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .nf__subtitle {
          font-size: 15px;
          color: #7a9bbf;
          margin: 0 0 36px;
          max-width: 360px;
        }
        .nf__btn {
          display: inline-block;
          padding: 12px 28px;
          background: #1d4ed8;
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.15s, transform 0.1s;
        }
        .nf__btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
      `}</style>

            <div className="nf">
                <div className="nf__code">404</div>
                <div className="nf__icon">{esSinAcceso ? "🔒" : "🎮"}</div>
                <h1 className="nf__title">
                    {esSinAcceso ? "Sin acceso" : "Página no encontrada"}
                </h1>
                <p className="nf__subtitle">
                    {esSinAcceso
                        ? "No tenés permisos para ver esta página."
                        : "La página que buscás no existe o fue movida."}
                </p>
                <Link to="/" className="nf__btn">Volver al inicio</Link>
            </div>
        </>
    );
}

export default NotFound;