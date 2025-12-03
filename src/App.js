import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

/* ---------- NAVBARS & FOOTERS ---------- */
import ClientNavbar from "./pages/client/ClientNavbar";
import ClientFooter from "./pages/client/ClientFooter";

import VeterinarioNavbar from "./pages/veterinarian/VeterinarioNavbar";
import VeterinarioFooter from "./pages/veterinarian/VeterinarioFooter";

import AsistenteNavbar from "./pages/assistant/AssistantNavbar";
import AsistenteFooter from "./pages/assistant/AssistantFooter";

/* ---------- LOGIN ---------- */
import LoginClient from "./components/LoginClient";
import LoginAssistant from "./components/LoginAssistant";
import LoginVeterinarian from "./components/LoginVeterinarian";

/* ---------- REGISTRO ---------- */
import RegisterAssistant from "./components/RegisterAssistant";
import RegisterClient from "./components/RegisterClient";
import RegisterVeterinarian from "./components/RegisterVeterinarian";

/* ---------- HOME ---------- */
import HomeClient from "./pages/client/HomeClient";
import HomeAssistant from "./pages/assistant/HomeAssistant";
import HomeVeterinarian from "./pages/veterinarian/HomeVeterinarian";

/* ---------- ASISTENTE ---------- */
import Mascotas from "./pages/assistant/Mascotas";
import Veterinarios from "./pages/assistant/Veterinarios";
import Citas from "./pages/assistant/Citas";

/* ---------- VETERINARIO ---------- */
import CitasVeterinario from "./pages/veterinarian/CitasVeterinario";
import HistorialClinico from "./pages/veterinarian/HistorialClinico";
import Pacientes from "./pages/veterinarian/Pacientes";
import Vacunas from "./pages/veterinarian/Vacunas";

/* ---------- CLIENTE ---------- */
import Inicio from "./pages/client/Inicio";
import Nosotros from "./pages/client/Nosotros";
import Contacto from "./pages/client/Contacto";
import Mascota from "./pages/client/Mascota";
import Servicios from "./pages/client/Servicios";
import AgendarCita from "./pages/client/AgendarCita";

/* ============================================================
   LAYOUT CLIENTE
============================================================ */
function ClientLayout({ children }) {
  const location = useLocation();

  const clientRoutes = [
    "/cliente/inicio",
    "/cliente/nosotros",
    "/cliente/contacto",
    "/cliente/mascota",
    "/cliente/servicios",
    "/cliente/agendarcita",
    "/cliente/home"
  ];

  const show = clientRoutes.includes(location.pathname);

  return (
    <>
      {show && <ClientNavbar />}
      <main style={{ marginTop: "100px" }}>{children}</main>
      {show && <ClientFooter />}
    </>
  );
}

/* ============================================================
   LAYOUT ASISTENTE
============================================================ */
function AsistenteLayout({ children }) {
  const location = useLocation();

  const assistantRoutes = [
    "/asistente/home",
    "/asistente/mascotas",
    "/asistente/veterinarios",
    "/asistente/citas"
  ];

  const show = assistantRoutes.includes(location.pathname);

  return (
    <>
      {show && <AsistenteNavbar />}
      <main style={{ marginTop: "100px" }}>{children}</main>
      {show && <AsistenteFooter />}
    </>
  );
}

/* ============================================================
   LAYOUT VETERINARIO
============================================================ */
function VeterinarioLayout({ children }) {
  const location = useLocation();

  const vetRoutes = [
    "/veterinario/home",
    "/veterinario/citas",
    "/veterinario/historial",
    "/veterinario/pacientes",
    "/veterinario/vacunas",
  ];

  const show = vetRoutes.includes(location.pathname);

  return (
    <>
      {show && <VeterinarioNavbar />}
      <main style={{ marginTop: "100px" }}>{children}</main>
      {show && <VeterinarioFooter />}
    </>
  );
}

/* ============================================================
   APP PRINCIPAL COMPLETO
============================================================ */
function App() {
  return (
    <Router>
      <Routes>

        {/* Redirección default */}
        <Route path="/" element={<Navigate to="/cliente" replace />} />

        {/* LOGIN */}
        <Route path="/cliente" element={<LoginClient />} />
        <Route path="/asistente" element={<LoginAssistant />} />
        <Route path="/veterinario" element={<LoginVeterinarian />} />

        {/* REGISTRO */}
        <Route path="/cliente/register" element={<RegisterClient />} />
        <Route path="/asistente/register" element={<RegisterAssistant />} />
        <Route path="/veterinario/register" element={<RegisterVeterinarian />} />

        {/* ================= CLIENTE ================= */}
        <Route
          path="/cliente/*"
          element={
            <ClientLayout>
              <Routes>
                <Route path="home" element={<HomeClient />} />
                <Route path="inicio" element={<Inicio />} />
                <Route path="nosotros" element={<Nosotros />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="mascota" element={<Mascota />} />
                <Route path="servicios" element={<Servicios />} />
                <Route path="agendarcita" element={<AgendarCita />} />
              </Routes>
            </ClientLayout>
          }
        />

        {/* ================= ASISTENTE ================= */}
        <Route
          path="/asistente/*"
          element={
            <AsistenteLayout>
              <Routes>
                <Route path="home" element={<HomeAssistant />} />
                <Route path="mascotas" element={<Mascotas />} />
                <Route path="veterinarios" element={<Veterinarios />} />
                <Route path="citas" element={<Citas />} />
              </Routes>
            </AsistenteLayout>
          }
        />

        {/* ================= VETERINARIO ================= */}
        <Route
          path="/veterinario/*"
          element={
            <VeterinarioLayout>
              <Routes>
                <Route path="home" element={<HomeVeterinarian />} />
                <Route path="citas" element={<CitasVeterinario />} />
                <Route path="historial" element={<HistorialClinico />} />
                <Route path="pacientes" element={<Pacientes />} />
                <Route path="vacunas" element={<Vacunas />} />
              </Routes>
            </VeterinarioLayout>
          }
        />

        {/* LOGOUT */}
        <Route path="/logout/asistente" element={<LoginAssistant />} />
        <Route path="/logout/veterinario" element={<LoginVeterinarian />} />
        <Route path="/logout/cliente" element={<LoginClient />} />

      </Routes>
    </Router>
  );
}

export default App;
