import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, TextField, Box, Typography,
  Snackbar, Alert, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

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

export default function Mascota() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null, nombre: "", especie: "", raza: "", edad: "", peso: "", idDueno: null,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const token = localStorage.getItem("token");
  const idUsuario = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => { fetchMascotas(); }, []);

  const fetchMascotas = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/cliente/mascotas/usuario/${idUsuario}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Error al cargar mascotas");
      const data = await response.json();
      setMascotas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openNewForm = () => {
    setFormData({
      id: null, nombre: "", especie: "", raza: "", edad: "", peso: "", idDueno: idUsuario,
    });
    setFormVisible(true);
  };

  const openEditForm = (mascota) => {
    setFormData({ ...mascota });
    setFormVisible(true);
  };

  const cancelForm = () => setFormVisible(false);

  const saveMascota = async () => {
    if (!formData.nombre || !formData.especie || !formData.edad) {
      setSnackbar({ open: true, message: "Complete los campos obligatorios", severity: "warning" });
      return;
    }
    try {
      const response = await fetch("https://veterinaria-petcare.onrender.com/d/w/cliente/mascotas/save", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error guardando mascota");

      setSnackbar({ open: true, message: "✅ Mascota guardada correctamente", severity: "success" });
      setFormVisible(false);
      fetchMascotas();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const confirmDelete = (id) => {
    setConfirmDialog({ open: true, id });
  };

  const deleteMascota = async () => {
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/cliente/mascotas/delete/${confirmDialog.id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Error al eliminar mascota");

      setSnackbar({ open: true, message: "🗑️ Mascota eliminada correctamente", severity: "success" });
      setConfirmDialog({ open: false, id: null });
      fetchMascotas();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  if (loading) return <Typography sx={{ textAlign: "center" }}>Cargando mascotas...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ backgroundColor: "#EFF9FE", p: 5, minHeight: "35vh" }}>
      <Typography variant="h4" sx={{ color: "#091F5B", fontWeight: "900", mb: 4, textAlign: "center" }}>
        🐾 Mis Mascotas
      </Typography>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={openNewForm}
          sx={{ backgroundColor: "#344EAD", fontWeight: "bold", "&:hover": { backgroundColor: "#2C3E9F" } }}
        >
          Nueva Mascota
        </Button>
      </Box>

      {/* Formulario */}
      {formVisible && (
        <Paper sx={{ p: 4, mb: 4, maxWidth: 600, mx: "auto", backgroundColor: "white" }}>
          <Typography variant="h6" sx={{ mb: 3, color: "#091F5B", fontWeight: "bold" }}>
            {formData.id ? "Editar Mascota" : "Registrar Nueva Mascota"}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
            <TextField label="Especie" name="especie" value={formData.especie} onChange={handleInputChange} required />
            <TextField label="Raza" name="raza" value={formData.raza} onChange={handleInputChange} />
            <TextField label="Edad" name="edad" type="number" value={formData.edad} onChange={handleInputChange} required />
            <TextField label="Peso (kg)" name="peso" type="number" value={formData.peso} onChange={handleInputChange} />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ backgroundColor: "#091F5B", "&:hover": { backgroundColor: "#122A6E" } }}
                onClick={saveMascota}
              >
                Guardar
              </Button>
              <Button variant="outlined" startIcon={<CancelIcon />} color="error" onClick={cancelForm}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Tabla */}
      <TableContainer component={Paper} sx={{ maxWidth: 1000, mx: "auto" }}>
        <Table sx={{ minWidth: 700 }} aria-label="tabla mascotas">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Especie</StyledTableCell>
              <StyledTableCell>Raza</StyledTableCell>
              <StyledTableCell>Edad</StyledTableCell>
              <StyledTableCell>Peso (kg)</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mascotas.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  No hay mascotas registradas.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              mascotas.map((m) => (
                <StyledTableRow key={m.id}>
                  <StyledTableCell>{m.id}</StyledTableCell>
                  <StyledTableCell>{m.nombre}</StyledTableCell>
                  <StyledTableCell>{m.especie}</StyledTableCell>
                  <StyledTableCell>{m.raza}</StyledTableCell>
                  <StyledTableCell>{m.edad}</StyledTableCell>
                  <StyledTableCell>{m.peso}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{ color: "#344EAD", borderColor: "#344EAD", mr: 1, "&:hover": { backgroundColor: "#E5E9FF" } }}
                      onClick={() => openEditForm(m)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => confirmDelete(m.id)}
                    >
                      Eliminar
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar de mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant={snackbar.severity === "error" ? "outlined" : "filled"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Diálogo de confirmación con borde rojo tipo Alert outlined */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, id: null })}
        PaperProps={{
          sx: {
            border: "2px solid red", 
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ color: "red", fontWeight: "bold" }}>
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#0D47A1" }}>
            ¿Estás seguro de que deseas eliminar esta mascota? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, id: null })}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={deleteMascota}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
