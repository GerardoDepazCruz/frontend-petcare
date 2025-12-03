import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
}));

export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  // Quitado "especialidad"
  const [formData, setFormData] = useState({
    id: null,
    nombre: ""
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [dialog, setDialog] = useState({ open: false, id: null });

  const token = localStorage.getItem("token");

  useEffect(() => {
    cargarVeterinarios();
  }, []);

  const cargarVeterinarios = async () => {
    try {
      const res = await fetch("https://veterinaria-petcare.onrender.com/d/w/veterinarios/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error cargando veterinarios");
      const data = await res.json();
      setVeterinarios(data);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openFormNew = () => {
    setFormData({ id: null, nombre: "" });
    setFormVisible(true);
  };

  const openFormEdit = (vet) => {
    // ignora especialidad si viene del backend
    setFormData({ id: vet.id, nombre: vet.nombre });
    setFormVisible(true);
  };

  const guardarVeterinario = async () => {
    if (!formData.nombre) {
      return setSnackbar({
        open: true,
        message: "Complete todos los campos",
        severity: "warning",
      });
    }

    try {
      const res = await fetch("https://veterinaria-petcare.onrender.com/d/w/veterinarios/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // solo envía id + nombre
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al guardar");

      setSnackbar({
        open: true,
        message: "Guardado correctamente",
        severity: "success",
      });

      setFormVisible(false);
      cargarVeterinarios();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const eliminarVeterinario = async () => {
    try {
      const res = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/veterinarios/delete/${dialog.id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error("Error al eliminar");

      setSnackbar({
        open: true,
        message: "Veterinario eliminado",
        severity: "success",
      });

      setDialog({ open: false, id: null });
      cargarVeterinarios();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <>
      <AssistantNavbar />

      <Box sx={{ backgroundColor: "#EFF9FE", p: 6, minHeight: "80vh" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#091F5B",
            fontWeight: 900,
            mb: 4,
            textAlign: "center",
          }}
        >
           Gestión de Veterinarios
        </Typography>

        {/* Formulario */}
        {formVisible && (
          <Paper sx={{ p: 4, mb: 4, maxWidth: 600, mx: "auto" }}>
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "#091F5B", fontWeight: "bold" }}
            >
              {formData.id
                ? "Editar Veterinario"
                : "Registrar Nuevo Veterinario"}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />

              <Box
                sx={{ display: "flex", gap: 2, justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={guardarVeterinario}
                  sx={{ backgroundColor: "#091F5B" }}
                >
                  Guardar
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  color="error"
                  onClick={() => setFormVisible(false)}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Tabla */}
        <TableContainer component={Paper} sx={{ maxWidth: 900, mx: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {veterinarios.map((v) => (
                <StyledTableRow key={v.id}>
                  <StyledTableCell>{v.id}</StyledTableCell>
                  <StyledTableCell>{v.nombre}</StyledTableCell>

                  <StyledTableCell align="center">

                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() =>
                        setDialog({ open: true, id: v.id })
                      }
                    >
                      Eliminar
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Diálogo */}
        <Dialog
          open={dialog.open}
          onClose={() => setDialog({ open: false })}
        >
          <DialogTitle>Eliminar Veterinario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Seguro que deseas eliminar este registro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({ open: false })}>
              Cancelar
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={eliminarVeterinario}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() =>
            setSnackbar({ ...snackbar, open: false })
          }
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
