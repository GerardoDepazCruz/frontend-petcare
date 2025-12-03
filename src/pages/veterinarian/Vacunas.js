import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

function Vacunas() {
  const token = localStorage.getItem("token");

  const [vacunas, setVacunas] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");

  // Cargar vacunas disponibles
  const fetchVacunas = async () => {
    try {
      const res = await fetch("https://veterinaria-petcare.onrender.com/d/w/vacunas/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setVacunas(data);
    } catch (err) {
      alert("Error al cargar vacunas: " + err.message);
    }
  };

  useEffect(() => {
    fetchVacunas();
  }, []);

  // --- FILTRO ---
  const vacunasFiltradas = vacunas.filter((v) =>
    v.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Vacunas disponibles */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 100, mb: 2, color: "#091F5B" }}
        >
          Vacunas Disponibles
        </Typography>

        {/* BUSCADOR */}
        <TextField
          fullWidth
          label="Buscar por nombre de vacuna"
          variant="outlined"
          sx={{ mb: 3 }}
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#dbe3ff" }}>
              <th style={{ padding: 10, textAlign: "center" }}>ID</th>
              <th style={{ padding: 10, textAlign: "center" }}>Nombre</th>
              <th style={{ padding: 10, textAlign: "center" }}>Descripción</th>
            </tr>
          </thead>

          <tbody>
            {vacunasFiltradas.map((v) => (
              <tr key={v.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: 10, textAlign: "center" }}>{v.id}</td>
                <td style={{ padding: 10, textAlign: "center" }}>{v.nombre}</td>
                <td style={{ padding: 10, textAlign: "center" }}>{v.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Box>
  );
}

export default Vacunas;
