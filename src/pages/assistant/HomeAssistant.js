import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import AssistantNavbar from "./AssistantNavbar";

export default function HomeAssistant() {
  const [citasHoy, setCitasHoy] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDatosIniciales();
  }, []);

  // ============================
  //   CARGAR DATOS INICIALES
  // ============================
  const fetchDatosIniciales = async () => {
    try {
      // 1️⃣ Usuarios
      const resUsuarios = await fetch("https://veterinaria-petcare.onrender.com/d/w/usuarios/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataUsuarios = await resUsuarios.json();
      const dueños = dataUsuarios.filter((u) => u.rolId === 3); // Solo rol cliente
      setUsuarios(dueños);

      // 2️⃣ Mascotas
      const resMascotas = await fetch("https://veterinaria-petcare.onrender.com/d/w/mascotas/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataMascotas = await resMascotas.json();
      setMascotas(dataMascotas);

      // 3️⃣ Veterinarios
      const resVeterinarios = await fetch("https://veterinaria-petcare.onrender.com/d/w/veterinarios/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataVeterinarios = await resVeterinarios.json();
      setVeterinarios(dataVeterinarios);

      // 4️⃣ Citas
      const resCitas = await fetch("https://veterinaria-petcare.onrender.com/d/w/citas/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataCitas = await resCitas.json();

      // Filtrar citas de hoy
      const hoy = new Date().toISOString().split("T")[0];
      const filtradas = dataCitas.filter((c) => c.fecha === hoy);

      // Mapear IDs a nombres y razas
      const mapeadas = filtradas.map((c) => {
        const mascota = mascotas.find((m) => m.id === c.idMascota) || {};
        const veterinario = veterinarios.find((v) => v.id === c.idVeterinario) || {};
        const usuario = usuarios.find((u) => u.id === c.idUsuario) || {};

        return {
          ...c,
          nombreMascota: mascota.nombre || `ID: ${c.idMascota}`,
          razaMascota: mascota.raza || "",
          nombreVeterinario: veterinario.nombre || `ID: ${c.idVeterinario}`,
          nombreDueno: usuario.nombre ? `${usuario.nombre} ${usuario.apellido || ""}` : `ID: ${c.idUsuario}`,
        };
      });

      setCitasHoy(mapeadas);
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    }
  };

  return (
    <>
      <AssistantNavbar />

      <Box
        sx={{
          backgroundColor: "#EFF6FD",
          minHeight: "100vh",
          pt: "140px",
          pb: "80px",
          px: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1400px" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#091F5B",
              mb: 4,
            }}
          >
            Citas programadas – <span style={{ color: "#1E3977" }}>Hoy</span>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 4,
              justifyItems: "center",
              mb: 6,
            }}
          >
            {citasHoy.length === 0 ? (
              <Typography sx={{ fontSize: "1.3rem", color: "#1E3977" }}>
                No hay citas registradas para hoy...
              </Typography>
            ) : (
              citasHoy.map((cita) => (
                <Paper
                  key={cita.id}
                  elevation={4}
                  sx={{
                    width: "100%",
                    maxWidth: 280,
                    p: 3,
                    borderRadius: 4,
                    border: "2px solid #C5D3E8",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0px 8px 18px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "#091F5B",
                      fontSize: "1.3rem",
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    {cita.hora}
                  </Typography>

                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
                    {cita.nombreMascota} ({cita.razaMascota || "Mascota"})
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    <b>Veterinario:</b> {cita.nombreVeterinario}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    <b>Dueño:</b> {cita.nombreDueno}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 700,
                      color: cita.estado === "pendiente" ? "green" : "#091F5B",
                      textAlign: "center",
                    }}
                  >
                    Estado: {cita.estado || "pendiente"}
                  </Typography>
                </Paper>
              ))
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <Button
              variant="contained"
              href="/asistente/citas"
              sx={{
                backgroundColor: "#344EAD",
                px: 4,
                py: 2,
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#2c3f94" },
              }}
            >
              Agregar nueva cita
            </Button>

            <Button
              variant="contained"
              href="/asistente/citas"
              sx={{
                backgroundColor: "#344EAD",
                px: 4,
                py: 2,
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#2c3f94" },
              }}
            >
              Ver calendario completo
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
