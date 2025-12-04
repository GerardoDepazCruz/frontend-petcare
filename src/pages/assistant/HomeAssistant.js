import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import AssistantNavbar from "./AssistantNavbar";

export default function HomeAssistant() {
  const [citasHoy, setCitasHoy] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCitasHoy();
    fetchUsuarios(); // <── cargamos usuarios para obtener nombres
  }, []);

  // ============================
  //      OBTENER CITAS HOY
  // ============================
  const fetchCitasHoy = async () => {
    try {
      const res = await fetch("https://veterinaria-petcare.onrender.com/d/w/citas/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const hoy = new Date().toISOString().split("T")[0];
      const filtradas = data.filter((c) => c.fecha === hoy);

      setCitasHoy(filtradas);
    } catch (error) {
      console.error("Error cargando citas del día", error);
    }
  };

  // ============================
  //   OBTENER USUARIOS (Rol 3)
  // ============================
  const fetchUsuarios = async () => {
    try {
      const res = await fetch("https://veterinaria-petcare.onrender.com/d/w/usuarios/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const lista = await res.json();

      // Filtrar solo rol 3 (dueños)
      const dueños = lista.filter((u) => u.rolId === 3);

      setUsuarios(dueños);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  // ============================================
  //    ENCONTRAR NOMBRE DEL DUEÑO DESDE EL ID
  // ============================================
  const getNombreDueno = (idDueno) => {
    const dueno = usuarios.find((u) => u.id === idDueno);

    if (!dueno) return `ID: ${idDueno}`;

    return `${dueno.nombre} ${dueno.apellido || ""}`;
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
                No hay citas registradas para hoy.
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

                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 700,
                      color: cita.estado === "pendiente" ? "green" : "#091F5B",
                      textAlign: "center",
                    }}
                  >
                    Estado: {cita.estado}
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
