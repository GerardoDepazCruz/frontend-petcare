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
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

function LoginAssistant() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://veterinaria-petcare.onrender.com/d/w/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/asistente/home");
      } else {
        setError(data.error || "Credenciales inválidas");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
      setOpenSnackbar(true);
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
        bgcolor: "#E3F1FF",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          maxWidth: 460,
          width: "100%",
          textAlign: "center",
          backgroundColor: "#C2DBEF",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold", color: "#091F5B" }}>
          Login Asistente
        </Typography>

        <form onSubmit={handleSubmit}>
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
              style: { backgroundColor: "#fff", borderRadius: "10px" },
            }}
          />

          <TextField
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { backgroundColor: "#fff", borderRadius: "10px" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: "bold",
              backgroundColor: "#344EAD",
              borderRadius: "10px",
            }}
          >
            Entrar
          </Button>
        </form>

        <Typography sx={{ mt: 3 }}>
          ¿No tienes cuenta?{" "}
          <Link to="/asistente/register" style={{ fontWeight: "bold", color: "#344EAD" }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginAssistant;
