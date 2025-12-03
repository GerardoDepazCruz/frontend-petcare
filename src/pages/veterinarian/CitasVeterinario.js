import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// MUI
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Estilos de las tablas (igual que Cliente)
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#091F5B",
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: "15px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EFF9FE",
  },
}));

function CitasVeterinario() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const idVeterinario = localStorage.getItem("userId");

  useEffect(() => {
    if (!idVeterinario) {
      setError("ID de veterinario no encontrado, por favor ingresa nuevamente");
      setLoading(false);
      return;
    }
    fetchCitas();
  }, [idVeterinario]);

  const fetchCitas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/veterinario/citas/${idVeterinario}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        const errMessage = await response.text();
        throw new Error("Error al obtener citas: " + errMessage);
      }

      const textData = await response.text();
      const data = textData ? JSON.parse(textData) : [];
      setCitas(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err.message);
      setCitas([]);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(citas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Citas");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataExcel = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataExcel, "citas.xlsx");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Citas", 20, 10);
    const rows = citas.map(
      ({ id, fecha, hora, estado, nombreMascota, nombreServicio }) => [
        id,
        fecha,
        hora,
        estado,
        nombreMascota || "-",
        nombreServicio || "-",
      ]
    );
    autoTable(doc, {
      head: [["ID", "Fecha", "Hora", "Estado", "Mascota", "Servicio"]],
      body: rows,
      startY: 20,
    });
    doc.save("citas.pdf");
  };

  if (loading)
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Cargando citas...</Typography>;

  if (error)
    return (
      <Typography sx={{ color: "red", mt: 4, textAlign: "center" }}>
        {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        padding: "30px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: "#091F5B",
          mb: 3,
          textAlign: "center",
        }}
      >
        Mis Citas
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={exportToExcel}
          sx={{ backgroundColor: "#091F5B" }}
        >
          Exportar Excel
        </Button>

        <Button
          variant="contained"
          onClick={generatePDF}
          sx={{ backgroundColor: "#091F5B" }}
        >
          Exportar PDF
        </Button>
      </Box>

      {citas.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "#091F5B", mt: 2 }}>
          No tienes citas asignadas.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "15px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Fecha</StyledTableCell>
                <StyledTableCell>Hora</StyledTableCell>
                <StyledTableCell>Estado</StyledTableCell>
                <StyledTableCell>Mascota</StyledTableCell>
                <StyledTableCell>Servicio</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {citas.map((cita) => (
                <StyledTableRow key={cita.id}>
                  <TableCell>{cita.id}</TableCell>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.estado}</TableCell>
                  <TableCell>{cita.nombreMascota || "-"}</TableCell>
                  <TableCell>{cita.nombreServicio || "-"}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default CitasVeterinario;
