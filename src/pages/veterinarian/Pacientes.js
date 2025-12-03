import React, { useEffect, useState, useCallback } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";

function Pacientes() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [showVacunaModal, setShowVacunaModal] = useState(false);

  const [historiales, setHistoriales] = useState([]);
  const [vacunas, setVacunas] = useState([]);

  const [historialDescripcion, setHistorialDescripcion] = useState("");
  const [vacunaSeleccionada, setVacunaSeleccionada] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const token = localStorage.getItem("token");
  const idVeterinario = localStorage.getItem("userId");

  const fetchMascotas = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://veterinaria-petcare.onrender.com/d/w/veterinario/pacientes/${idVeterinario}/mascotas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Error al cargar mascotas");
      }
      const data = await response.json();
      setMascotas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMascotas();
  }, [fetchMascotas]);

  // Historial
  const abrirHistorialModal = async (mascota) => {
    setMascotaSeleccionada(mascota);
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/veterinario/pacientes/${mascota.id}/historial`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Error al cargar historial");

      const data = await response.json();
      setHistoriales(data);
      setShowHistorialModal(true);
      setHistorialDescripcion("");
    } catch (err) {
      alert(err.message);
    }
  };

  const guardarHistorial = async () => {
    if (!historialDescripcion.trim()) {
      alert("La descripción es obligatoria");
      return;
    }
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/veterinario/pacientes/${mascotaSeleccionada.id}/historial/add?idVeterinario=${idVeterinario}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ descripcion: historialDescripcion }),
        }
      );
      if (!response.ok) throw new Error("Error al guardar historial");

      alert("Historial guardado");
      abrirHistorialModal(mascotaSeleccionada);
    } catch (err) {
      alert(err.message);
    }
  };

  const eliminarHistorial = async (idHistorial) => {
    if (!window.confirm("¿Confirma eliminar este historial?")) return;
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/veterinario/pacientes/${mascotaSeleccionada.id}/historial/delete/${idHistorial}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Error al eliminar historial");
      abrirHistorialModal(mascotaSeleccionada);
    } catch (err) {
      alert(err.message);
    }
  };

  // Vacunas
  const abrirVacunaModal = async (mascota) => {
    setMascotaSeleccionada(mascota);
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/veterinario/pacientes/${mascota.id}/vacunas`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Error al cargar vacunas");

      const data = await response.json();
      setVacunas(data);
      setVacunaSeleccionada(null);
      setShowVacunaModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const aplicarVacuna = async () => {
    if (!vacunaSeleccionada) {
      alert("Seleccione una vacuna");
      return;
    }
    try {
      const response = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/veterinario/pacientes/${mascotaSeleccionada.id}/vacunas/aplicar?idVeterinario=${idVeterinario}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vacunaSeleccionada),
        }
      );
      if (!response.ok) throw new Error("Error al aplicar vacuna");

      alert("Vacuna aplicada");
      setShowVacunaModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#091F5B" mb={2}>
        Pacientes - Mascotas
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#091F5B" }}>
            <TableRow>
              {["ID", "Nombre", "Especie", "Edad", "Acciones"].map((col) => (
                <TableCell key={col} sx={{ color: "white", fontWeight: 600 }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {mascotas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay mascotas registradas.
                </TableCell>
              </TableRow>
            ) : (
              mascotas.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>{m.id}</TableCell>
                  <TableCell>{m.nombre}</TableCell>
                  <TableCell>{m.especie}</TableCell>
                  <TableCell>{m.edad}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ mr: 1, backgroundColor: "#1976d2" }}
                      onClick={() => abrirHistorialModal(m)}
                    >
                      Historial
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: "#2e7d32" }}
                      onClick={() => abrirVacunaModal(m)}
                    >
                      Vacunas
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL HISTORIAL */}
      <Dialog open={showHistorialModal} onClose={() => setShowHistorialModal(false)} fullWidth maxWidth="md">
        <DialogTitle>Historial Clínico de {mascotaSeleccionada?.nombre}</DialogTitle>

        <DialogContent>
          <Table size="small" sx={{ mb: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {historiales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay historiales registrados.
                  </TableCell>
                </TableRow>
              ) : (
                historiales.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>{h.id}</TableCell>
                    <TableCell>{h.fecha}</TableCell>
                    <TableCell>{h.descripcion}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => eliminarHistorial(h.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Agregar Historial Clínico
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 1 }}
            value={historialDescripcion}
            onChange={(e) => setHistorialDescripcion(e.target.value)}
            placeholder="Descripción"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowHistorialModal(false)}>Cerrar</Button>
          <Button variant="contained" onClick={guardarHistorial}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL VACUNAS */}
      <Dialog open={showVacunaModal} onClose={() => setShowVacunaModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Vacunas disponibles para {mascotaSeleccionada?.nombre}</DialogTitle>

        <DialogContent>
          <Select
            fullWidth
            sx={{ mt: 1 }}
            value={vacunaSeleccionada ? vacunaSeleccionada.id : ""}
            onChange={(e) =>
              setVacunaSeleccionada(vacunas.find((v) => v.id === Number(e.target.value)))
            }
          >
            <MenuItem value="">Seleccione una vacuna</MenuItem>
            {vacunas.map((v) => (
              <MenuItem key={v.id} value={v.id}>
                {v.nombre}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowVacunaModal(false)}>Cerrar</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2e7d32" }}
            disabled={!vacunaSeleccionada}
            onClick={aplicarVacuna}
          >
            Aplicar Vacuna
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Pacientes;

