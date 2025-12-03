import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// MUI
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";

function HistorialClinico() {
  const [historiales, setHistoriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const idVeterinario = localStorage.getItem("userId");

  useEffect(() => {
    if (idVeterinario) {
      fetchHistoriales("");
    }
  }, [idVeterinario]);

  const fetchHistoriales = async (nombreMascota) => {
    setLoading(true);
    setError("");

    let url = `https://veterinaria-petcare.onrender.com/d/w/veterinario/historial/all/${idVeterinario}`;
    if (nombreMascota && nombreMascota.trim() !== "") {
      url = `https://veterinaria-petcare.onrender.com/d/w/veterinario/historial/search/${idVeterinario}?nombreMascota=${encodeURIComponent(nombreMascota)}`;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Error al obtener historiales: ${message}`);
      }

      const textData = await response.text();
      const data = textData ? JSON.parse(textData) : [];
      setHistoriales(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setHistoriales([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHistoriales(search);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(historiales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HistorialClinico");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer]), "historial_clinico.xlsx");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte Historial Clínico", 20, 10);

    const rows = historiales.map(
      ({ id, descripcion, fecha, nombreMascota, nombreVeterinario }) => [
        id,
        descripcion,
        fecha,
        nombreMascota,
        nombreVeterinario,
      ]
    );

    autoTable(doc, {
      head: [["ID", "Descripción", "Fecha", "Mascota", "Veterinario"]],
      body: rows,
      startY: 20,
    });

    doc.save("historial_clinico.pdf");
  };

  return (
    <Box sx={{ maxWidth: "90%", mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Historial Clínico
      </Typography>

      {/* BUSCADOR */}
      <form onSubmit={handleSearchSubmit}>
        <Stack direction="row" spacing={2} mb={3}>
          <TextField
            label="Buscar por nombre de mascota"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Buscar
          </Button>
        </Stack>
      </form>

      {/* BOTONES EXPORTACIÓN */}
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="outlined" onClick={exportToExcel}>
          Exportar Excel
        </Button>
        <Button variant="outlined" onClick={generatePDF}>
          Exportar PDF
        </Button>
      </Stack>

      {/* MENSAJES */}
      {loading && (
        <Typography color="text.secondary">Cargando datos…</Typography>
      )}

      {error && <Typography color="error">{error}</Typography>}

      {/* TABLA */}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Descripción</strong></TableCell>
                <TableCell><strong>Fecha</strong></TableCell>
                <TableCell><strong>Mascota</strong></TableCell>
                <TableCell><strong>Veterinario</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {historiales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No hay registros.
                  </TableCell>
                </TableRow>
              ) : (
                historiales.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>{h.id}</TableCell>
                    <TableCell>{h.descripcion}</TableCell>
                    <TableCell>{h.fecha}</TableCell>
                    <TableCell>{h.nombreMascota}</TableCell>
                    <TableCell>{h.nombreVeterinario}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default HistorialClinico;

