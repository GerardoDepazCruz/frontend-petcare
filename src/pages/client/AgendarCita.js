import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";

function AgendarCita() {
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);

  const [historial, setHistorial] = useState(() => {
    const saved = localStorage.getItem("historialCitas");
    return saved ? JSON.parse(saved) : [];
  });

  const [cita, setCita] = useState({
    fecha: "",
    hora: "",
    idMascota: "",
    idServicio: "",
    idVeterinario: "",
  });

  const [showResumen, setShowResumen] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const [datosPago, setDatosPago] = useState({ nombre: "", tarjeta: "" });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");
  const idUsuario = localStorage.getItem("userId");

  useEffect(() => {
    fetchMascotas();
    fetchServicios();
    fetchVeterinarios();
  }, []);

  const fetchMascotas = async () => {
    try {
      const resp = await fetch(
        `https://veterinaria-petcare.onrender.com/d/w/cliente/mascotas/usuario/${idUsuario}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!resp.ok) throw new Error("Error al cargar mascotas");
      const data = await resp.json();
      setMascotas(data);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const fetchServicios = async () => {
    try {
      const resp = await fetch("https://veterinaria-petcare.onrender.com/d/w/servicios/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error("Error al cargar servicios");
      const data = await resp.json();
      setServicios(data);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const fetchVeterinarios = async () => {
    try {
      const resp = await fetch("https://veterinaria-petcare.onrender.com/d/w/veterinarios/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error("Error al cargar veterinarios");
      const data = await resp.json();
      setVeterinarios(data);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleChange = (e) => {
    setCita({ ...cita, [e.target.name]: e.target.value });
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
    setDatosPago({ nombre: "", tarjeta: "" });
  };

  const handleDatosPagoChange = (e) => {
    setDatosPago({ ...datosPago, [e.target.name]: e.target.value });
  };

  const abrirResumen = (e) => {
    e.preventDefault();
    if (!cita.fecha || !cita.hora || !cita.idMascota || !cita.idServicio || !cita.idVeterinario) {
      setSnackbar({
        open: true,
        message: "Complete todos los campos",
        severity: "error",
      });
      return;
    }
    setShowResumen(true);
  };

  const confirmarPago = async () => {
    if (!metodoPago) {
      setSnackbar({ open: true, message: "Seleccione un método de pago", severity: "warning" });
      return;
    }
    if (!datosPago.nombre.trim()) {
      setSnackbar({ open: true, message: "Ingrese su nombre", severity: "error" });
      return;
    }
    if (metodoPago === "tarjeta" && datosPago.tarjeta.trim().length !== 16) {
      setSnackbar({ open: true, message: "Tarjeta inválida", severity: "error" });
      return;
    }

    try {
      const response = await fetch("https://veterinaria-petcare.onrender.com/d/w/cliente/citas/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(cita),
      });
      if (!response.ok) throw new Error("Error al agendar cita");

      const nuevaCita = {
        ...cita,
        mascota: mascotas.find((m) => m.id === cita.idMascota)?.nombre || cita.idMascota,
        servicio: servicios.find((s) => s.id === cita.idServicio)?.nombre || cita.idServicio,
        veterinario:
          veterinarios.find((v) => v.id === cita.idVeterinario)?.nombre || cita.idVeterinario,
      };

      const actualizado = [...historial, nuevaCita];
      setHistorial(actualizado);
      localStorage.setItem("historialCitas", JSON.stringify(actualizado));

      setSnackbar({ open: true, message: "Cita registrada", severity: "success" });
      setShowResumen(false);
      setCita({ fecha: "", hora: "", idMascota: "", idServicio: "", idVeterinario: "" });
      setMetodoPago("");
      setDatosPago({ nombre: "", tarjeta: "" });
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#EFF9FE", minHeight: "20vh", py: 8, px: { xs: 3, md: 10 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, color: "#091F5B", textAlign: "center", mb: 6 }}>
        Agendar Cita
      </Typography>

      {!showResumen ? (
        <Card sx={{ maxWidth: 600, margin: "0 auto", p: 4, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, color: "#091F5B", fontWeight: "bold" }}>
              Datos de la cita
            </Typography>

            {/* ------------------ FORMULARIO MODIFICADO ------------------ */}
            <Grid container spacing={3}>

              {/* Mascota */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="mascota-label">Mascota</InputLabel>
                  <Select
                    fullWidth
                    labelId="mascota-label"
                    label="Mascota"
                    name="idMascota"
                    value={cita.idMascota}
                    onChange={handleChange}
                    sx={{ height: 50 }}
                  >
                    <MenuItem value="">Seleccione mascota</MenuItem>
                    {mascotas.map((m) => (
                      <MenuItem key={m.id} value={m.id}>{m.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Servicio */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="servicio-label">Servicio</InputLabel>
                  <Select
                    fullWidth
                    labelId="servicio-label"
                    label="Servicio"
                    name="idServicio"
                    value={cita.idServicio}
                    onChange={handleChange}
                    sx={{ height: 50 }}
                  >
                    <MenuItem value="">Seleccione servicio</MenuItem>
                    {servicios.map((s) => (
                      <MenuItem key={s.id} value={s.id}>{s.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Veterinario */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="veterinario-label">Veterinario</InputLabel>
                  <Select
                    fullWidth
                    labelId="veterinario-label"
                    label="Veterinario"
                    name="idVeterinario"
                    value={cita.idVeterinario}
                    onChange={handleChange}
                    sx={{ height: 50 }}
                  >
                    <MenuItem value="">Seleccione veterinario</MenuItem>
                    {veterinarios.map((v) => (
                      <MenuItem key={v.id} value={v.id}>{v.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Fecha */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha"
                  name="fecha"
                  value={cita.fecha}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ height: 50 }}
                />
              </Grid>

              {/* Hora */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="time"
                  label="Hora"
                  name="hora"
                  value={cita.hora}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ height: 50 }}
                />
              </Grid>

            </Grid>
            {/* ----------------------------------------------------------- */}

            <Button variant="contained" onClick={abrirResumen} startIcon={<EventAvailableIcon />} sx={{ mt: 4, width: "100%" }}>
              Agendar Cita
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 600, margin: "0 auto", p: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>Resumen de la cita</Typography>

            <Box sx={{ backgroundColor: "#F8FAFF", p: 3, borderRadius: 2, mb: 3 }}>
              <Typography><b>Mascota:</b> {cita.idMascota}</Typography>
              <Typography><b>Servicio:</b> {cita.idServicio}</Typography>
              <Typography><b>Veterinario:</b> {cita.idVeterinario}</Typography>
              <Typography><b>Fecha:</b> {cita.fecha}</Typography>
              <Typography><b>Hora:</b> {cita.hora}</Typography>
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Método de pago</InputLabel>
              <Select value={metodoPago} onChange={handleMetodoPagoChange}>
                <MenuItem value="">Seleccione método</MenuItem>
                <MenuItem value="efectivo">Efectivo</MenuItem>
                <MenuItem value="tarjeta">Tarjeta</MenuItem>
              </Select>
            </FormControl>

            {metodoPago && (
              <Box sx={{ mt: 3 }}>
                <TextField fullWidth label="Nombre completo" name="nombre" value={datosPago.nombre} onChange={handleDatosPagoChange} size="small" sx={{ mb: 2 }} />
                {metodoPago === "tarjeta" && (
                  <TextField fullWidth label="Número de tarjeta" name="tarjeta" value={datosPago.tarjeta} onChange={handleDatosPagoChange} size="small" inputProps={{ maxLength: 16 }} />
                )}
              </Box>
            )}

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button variant="contained" startIcon={<PaymentIcon />} onClick={confirmarPago} sx={{ flex: 1 }}>Confirmar y Pagar</Button>
              <Button variant="contained" startIcon={<CancelIcon />} color="error" onClick={() => setShowResumen(false)} sx={{ flex: 1 }}>Cancelar</Button>
            </Box>
          </CardContent>
        </Card>
      )}

      <Typography variant="h4" sx={{ mt: 8, mb: 3, fontWeight: "bold", textAlign: "center" }}>Historial de Citas</Typography>

      <Card sx={{ maxWidth: 900, margin: "0 auto", p: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Mascota</b></TableCell>
              <TableCell><b>Servicio</b></TableCell>
              <TableCell><b>Veterinario</b></TableCell>
              <TableCell><b>Fecha</b></TableCell>
              <TableCell><b>Hora</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historial.map((c, i) => (
              <TableRow key={i}>
                <TableCell>{c.mascota}</TableCell>
                <TableCell>{c.servicio}</TableCell>
                <TableCell>{c.veterinario}</TableCell>
                <TableCell>{c.fecha}</TableCell>
                <TableCell>{c.hora}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AgendarCita;
