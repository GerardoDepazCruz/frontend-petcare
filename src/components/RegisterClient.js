import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

function RegisterClient() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("https://veterinaria-petcare.onrender.com/d/w/api/auth/cliente/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          telefono,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/cliente");
      } else {
        setError(data.error || "Error en el registro");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          maxWidth: 550,
          width: "100%",
          textAlign: "center",
          backgroundColor: "#C2DBEF",
        }}
      >
        {/* Título */}
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: "bold", 
            color: "#091F5B",
            fontSize: "2rem",
          }}
        >
          Registro Cliente
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 4, 
            color: "#091F5B",
            opacity: 0.8,
          }}
        >
          Completa tus datos para crear una cuenta
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Grid para nombre y apellido */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#344EAD" }} />
                    </InputAdornment>
                  ),
                  style: { 
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }
                }}
                InputLabelProps={{
                  style: { fontWeight: "600", color: "#091F5B" }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#344EAD" }} />
                    </InputAdornment>
                  ),
                  style: { 
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }
                }}
                InputLabelProps={{
                  style: { fontWeight: "600", color: "#091F5B" }
                }}
              />
            </Grid>
          </Grid>

          {/* Campo de correo */}
          <TextField
            label="Correo Electrónico"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#344EAD" }} />
                </InputAdornment>
              ),
              style: { 
                backgroundColor: "#fff",
                borderRadius: "10px",
              }
            }}
            InputLabelProps={{
              style: { fontWeight: "600", color: "#091F5B" }
            }}
          />

          {/* Campo de teléfono */}
          <TextField
            label="Teléfono"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: "#344EAD" }} />
                </InputAdornment>
              ),
              style: { 
                backgroundColor: "#fff",
                borderRadius: "10px",
              }
            }}
            InputLabelProps={{
              style: { fontWeight: "600", color: "#091F5B" }
            }}
          />

          {/* Campo de contraseña */}
          <TextField
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#344EAD" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#344EAD" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { 
                backgroundColor: "#fff",
                borderRadius: "10px",
              }
            }}
            InputLabelProps={{
              style: { fontWeight: "600", color: "#091F5B" }
            }}
          />

          {/* Campo de confirmar contraseña */}
          <TextField
            label="Confirmar Contraseña"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#344EAD" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: "#344EAD" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { 
                backgroundColor: "#fff",
                borderRadius: "10px",
              }
            }}
            InputLabelProps={{
              style: { fontWeight: "600", color: "#091F5B" }
            }}
          />

          {/* Botón de registro */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: "#344EAD",
              borderRadius: "10px",
              "&:hover": { 
                backgroundColor: "#2C3E9F",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(52, 78, 173, 0.4)",
              },
              transition: "all 0.3s ease",
              mb: 3,
            }}
          >
            Registrarse
          </Button>
        </form>

        {/* Enlace de login */}
        <Typography variant="body2" sx={{ color: "#091F5B", fontWeight: 500 }}>
          ¿Ya tienes cuenta?{" "}
          <Link 
            to="/cliente" 
            style={{ 
              color: "#344EAD", 
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Inicia sesión aquí
          </Link>
        </Typography>
      </Paper>

      {/* Snackbar para errores */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ 
            width: "100%",
            borderRadius: "10px",
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RegisterClient;