import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// 🔹 IMPORTAR NAVBAR Y FOOTER DEL ASISTENTE
import AssistantNavbar from "./AssistantNavbar";

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    estado: "pendiente",
    idMascota: "",
    idServicio: "",
    idVeterinario: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [c, m, s, v] = await Promise.all([
        fetch("https://veterinaria-petcare.onrender.com/d/w/citas/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://veterinaria-petcare.onrender.com/d/w/mascotas/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://veterinaria-petcare.onrender.com/d/w/servicios/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://veterinaria-petcare.onrender.com/d/w/veterinarios/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setCitas(await c.json());
      setMascotas(await m.json());
      setServicios(await s.json());
      setVeterinarios(await v.json());
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error cargando datos",
        severity: "error",
      });
    }
    setLoading(false);
  };

  const handleOpenForm = (cita = null) => {
    if (cita) {
      setEditData(cita);
      setFormData({
        fecha: cita.fecha,
        hora: cita.hora,
        estado: cita.estado,
        idMascota: cita.idMascota,
        idServicio: cita.idServicio,
        idVeterinario: cita.idVeterinario,
      });
    } else {
      setEditData(null);
      setFormData({
        fecha: "",
        hora: "",
        estado: "pendiente",
        idMascota: "",
        idServicio: "",
        idVeterinario: "",
      });
    }
    setFormOpen(true);
  };

  const handleCloseForm = () => setFormOpen(false);

  const handleSubmit = async () => {
    const url = editData
      ? `https://veterinaria-petcare.onrender.com/d/w/citas/update/${editData.id}`
      : "https://veterinaria-petcare.onrender.com/d/w/citas/save";

    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setSnackbar({
        open: true,
        message: editData ? "Cita actualizada" : "Cita creada",
        severity: "success",
      });

      handleCloseForm();
      fetchAll();
    } catch {
      setSnackbar({ open: true, message: "Error guardando", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta cita?")) return;

    try {
      const res = await fetch(`https://veterinaria-petcare.onrender.com/d/w/citas/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      setSnackbar({
        open: true,
        message: "Cita eliminada",
        severity: "success",
      });

      fetchAll();
    } catch {
      setSnackbar({
        open: true,
        message: "Error eliminando",
        severity: "error",
      });
    }
  };

  return (
    <>
      {/* NAVBAR ARRIBA */}
      <AssistantNavbar />

      <Box sx={{ backgroundColor: "#EFF9FE", minHeight: "100vh", p: 5, mt: 15 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#091F5B",
            fontWeight: "900",
            mb: 4,
          }}
        >
          📅 Gestión de Citas
        </Typography>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ backgroundColor: "#344EAD", fontWeight: "bold" }}
            onClick={() => handleOpenForm()}
          >
            Nueva Cita
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxWidth: 1100, mx: "auto" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#091F5B" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Hora</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mascota</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Servicio</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Veterinario</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>Cargando...</TableCell>
                </TableRow>
              ) : citas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>No hay citas registradas.</TableCell>
                </TableRow>
              ) : (
                citas.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.fecha}</TableCell>
                    <TableCell>{c.hora}</TableCell>
                    <TableCell>{c.estado}</TableCell>
                    <TableCell>{c.nombreMascota}</TableCell>
                    <TableCell>{c.nombreServicio}</TableCell>
                    <TableCell>{c.nombreVeterinario}</TableCell>

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        sx={{ mr: 1 }}
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenForm(c)}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(c.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* FORMULARIO MODAL */}
        <Dialog open={formOpen} onClose={handleCloseForm} maxWidth="sm" fullWidth>
          <DialogTitle>{editData ? "Editar Cita" : "Nueva Cita"}</DialogTitle>

          <DialogContent dividers>
            <TextField
              label="Fecha"
              type="date"
              fullWidth
              margin="dense"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Hora"
              type="time"
              fullWidth
              margin="dense"
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Estado"
              select
              fullWidth
              margin="dense"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            >
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="atendida">Atendida</MenuItem>
              <MenuItem value="cancelada">Cancelada</MenuItem>
            </TextField>

            <TextField
              label="Mascota"
              select
              fullWidth
              margin="dense"
              value={formData.idMascota}
              onChange={(e) =>
                setFormData({ ...formData, idMascota: e.target.value })
              }
            >
              {mascotas.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Servicio"
              select
              fullWidth
              margin="dense"
              value={formData.idServicio}
              onChange={(e) =>
                setFormData({ ...formData, idServicio: e.target.value })
              }
            >
              {servicios.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Veterinario"
              select
              fullWidth
              margin="dense"
              value={formData.idVeterinario}
              onChange={(e) =>
                setFormData({ ...formData, idVeterinario: e.target.value })
              }
            >
              {veterinarios.map((v) => (
                <MenuItem key={v.id} value={v.id}>
                  {v.nombre} {v.apellido}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseForm}>Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>


    </>
  );
}
