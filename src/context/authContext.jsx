import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function getInitialAuth() {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return { token: null, user: null };

    try {
        const decoded = jwtDecode(storedToken);
        const ahora = Date.now() / 1000;
        if (decoded.exp < ahora) {
            localStorage.removeItem("token");
            return { token: null, user: null };
        }
        return { token: storedToken, user: { id: decoded.id, email: decoded.email, role: decoded.role } };
    } catch {
        localStorage.removeItem("token");
        return { token: null, user: null };
    }
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(getInitialAuth);

    const saveToken = (newToken) => {
        if (newToken) {
            const decoded = jwtDecode(newToken);
            localStorage.setItem("token", newToken);
            setAuth({ token: newToken, user: { id: decoded.id, email: decoded.email, role: decoded.role } });
        } else {
            localStorage.removeItem("token");
            setAuth({ token: null, user: null });
        }
    };

    return (
        <AuthContext.Provider value={{ user: auth.user, token: auth.token, setToken: saveToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}