import { useAuth } from "../context/authContext";
import { jwtDecode } from "jwt-decode";
import NotFound from "../pages/NotFound";

function RutaProtegida({ children, roles }) {
    const { token } = useAuth();

    if (!token) return <NotFound tipo="acceso" />;

    try {
        const decoded = jwtDecode(token);
        if (roles && !roles.includes(decoded.role)) {
            return <NotFound tipo="acceso" />;
        }
    } catch {
        return <NotFound tipo="acceso" />;
    }

    return children;
}

export default RutaProtegida;