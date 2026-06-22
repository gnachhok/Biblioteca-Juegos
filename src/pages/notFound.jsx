import { Link } from "react-router-dom";
import "./notFound.css"

function NotFound({ tipo = "pagina" }) {
    const esSinAcceso = tipo === "acceso";

    return (
        

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
    );
}

export default NotFound;