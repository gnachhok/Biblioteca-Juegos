import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Games from "./pages/games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddGames from "./pages/addGames";
import Usuarios from "./pages/superAdmin/Usuarios";
import SuperAdmin from "./pages/superAdmin/superAdmin";
import NotFound from "./pages/NotFound";
import RutaProtegida from "./components/RutaProtegida";
import MiBiblioteca from "./pages/miBiblioteca";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mibiblioteca" element={<MiBiblioteca />} />

          <Route path="/add-games" element={
            <RutaProtegida roles={["admin", "superadmin"]}>
              <AddGames />
            </RutaProtegida>
          } />

          <Route path="/super-admin" element={
            <RutaProtegida roles={["superadmin"]}>
              <SuperAdmin />
            </RutaProtegida>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;