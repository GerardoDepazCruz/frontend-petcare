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

import AssistantNavbar from "./AssistantNavbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#091F5B",
    color: "white",
    fontWeight: "bold",
  },
  "&.MuiTableCell-body": {
    color: "#091F5B",
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: "#EFF9FE" },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function Mascotas() {

  const [mascotas, setMascotas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    id: null, nombre: "", especie: "", raza: "", edad: "", peso: "", idDueno: ""
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const token = localStorage.getItem("token");

  // ======================
  //    OBTENER MASCOTAS
  // ======================
  const fetchMascotas = async () => {
    try {
      const response = await fetch("https://veterinaria-petcare.onrender.com/d/w/mascotas/all", {
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener mascotas");

      const data = await response.json();
      setMascotas(data);
      setError("");

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { fetchMascotas(); }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openNewForm = () => {
    setFormData({
      id: null,
      nombre: "",
      especie: "",
      raza: "",
      edad: "",
      peso: "",
      idDueno: "",
    });
    setFormVisible(true);
  };

  const openEditForm = (m) => {
    setFormData({ ...m });
    setFormVisible(true);
  };

  const cancelForm = () => setFormVisible(false);

  const saveMascota = async () => {
    try {
      const url = formData.id
        ? `https://veterinaria-petcare.onrender.com/d/w/mascotas/update/${formData.id}`
        : "https://veterinaria-petcare.onrender.com/d/w/mascotas/add";

      const method = formData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          especie: formData.especie,
          raza: formData.raza,
          edad: Number(formData.edad),
          peso: Number(formData.peso),
          idDueno: Number(formData.idDueno),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al guardar");
      }

      setSnackbar({ open: true, message: "Mascota guardada correctamente", severity: "success" });
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
        `https://veterinaria-petcare.onrender.com/d/w/mascotas/delete/${confirmDialog.id}`,
        {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar mascota");

      setSnackbar({ open: true, message: "Mascota eliminada", severity: "success" });
      setConfirmDialog({ open: false, id: null });
      fetchMascotas();

    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <>
      <AssistantNavbar />

      <Box sx={{ backgroundColor: "#EFF9FE", p: 6, minHeight: "80vh" }}>

        <Typography variant="h4" sx={{ color: "#091F5B", fontWeight: 900, mb: 4, textAlign: "center" }}>
          Gestión de Mascotas
        </Typography>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button variant="contained" startIcon={<AddCircleIcon />}
            sx={{ backgroundColor: "#344EAD" }} onClick={openNewForm}>
            Nueva Mascota
          </Button>
        </Box>

        {/* FORMULARIO */}
        {formVisible && (
          <Paper sx={{ p: 4, mb: 4, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {formData.id ? "Editar Mascota" : "Registrar Nueva Mascota"}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              <TextField label="Especie" name="especie" value={formData.especie} onChange={handleInputChange} required />
              <TextField label="Raza" name="raza" value={formData.raza} onChange={handleInputChange} />
              <TextField label="Edad" name="edad" type="number" value={formData.edad} onChange={handleInputChange} required />
              <TextField label="Peso (kg)" name="peso" type="number" value={formData.peso} onChange={handleInputChange} />
              <TextField label="ID Dueño" name="idDueno" type="number" value={formData.idDueno} onChange={handleInputChange} required />

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={saveMascota}>
                  Guardar
                </Button>
                <Button variant="outlined" startIcon={<CancelIcon />} color="error" onClick={cancelForm}>
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        {/* TABLA */}
        <TableContainer component={Paper} sx={{ maxWidth: 1000, mx: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Especie</StyledTableCell>
                <StyledTableCell>Raza</StyledTableCell>
                <StyledTableCell>Edad</StyledTableCell>
                <StyledTableCell>Peso</StyledTableCell>
                <StyledTableCell>ID Dueño</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mascotas.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} align="center">
                    No hay mascotas registradas
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
                    <StyledTableCell>{m.idDueno}</StyledTableCell>

                    <StyledTableCell align="center">
                      <Button variant="outlined" startIcon={<EditIcon />}
                        sx={{ mr: 1 }} onClick={() => openEditForm(m)}>
                        Editar
                      </Button>

                      <Button variant="outlined" startIcon={<DeleteIcon />} color="error"
                        onClick={() => confirmDelete(m.id)}>
                        Eliminar
                      </Button>
                    </StyledTableCell>

                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* SNACKBAR */}
        <Snackbar open={snackbar.open} autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>

        {/* DIÁLOGO */}
        <Dialog open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false })}>
          <DialogTitle>Eliminar Mascota</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Seguro deseas eliminar esta mascota?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog({ open: false })}>Cancelar</Button>
            <Button color="error" variant="contained" onClick={deleteMascota}>Eliminar</Button>
          </DialogActions>
        </Dialog>
      </Box>

    </>
  );
}
