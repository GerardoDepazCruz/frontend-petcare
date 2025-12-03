import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.mode === "light" ? "MuiTableCell-head" : "MuiTableCell-root"}`]: {
    backgroundColor: "#091F5B",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  [`&.${theme.palette.mode === "light" ? "MuiTableCell-body" : "MuiTableCell-root"}`]: {
    fontSize: 14,
    color: "#091F5B",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: "#EFF9FE" },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => { fetchServicios(); }, []);

  const fetchServicios = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://veterinaria-petcare.onrender.com/d/w/servicios/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al cargar los servicios");
      const data = await response.json();
      setServicios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography sx={{ textAlign: "center" }}>Cargando servicios...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ backgroundColor: "#EFF9FE", p: 5, minHeight: "35vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "#091F5B", fontWeight: "900", mb: 4, textAlign: "center" }}
      >
        Servicios
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: 1000, mx: "auto" }}>
        <Table sx={{ minWidth: 700 }} aria-label="tabla servicios">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Descripción</StyledTableCell>
              <StyledTableCell>Precio</StyledTableCell>
              <StyledTableCell>Especie Destino</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicios.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No hay servicios disponibles.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              servicios.map((s) => (
                <StyledTableRow key={s.id}>
                  <StyledTableCell>{s.id}</StyledTableCell>
                  <StyledTableCell>{s.nombre}</StyledTableCell>
                  <StyledTableCell>{s.descripcion}</StyledTableCell>
                  <StyledTableCell>S/{s.precio.toFixed(2)}</StyledTableCell>
                  <StyledTableCell>{s.especieDestino}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
