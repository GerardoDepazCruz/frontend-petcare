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
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

function LoginVeterinarian() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://veterinaria-petcare.onrender.com/d/w/api/auth/veterinario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        navigate("/veterinario/home");
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
        {/* TÍTULO */}
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: "bold",
            color: "#091F5B",
            fontSize: "2rem",
          }}
        >
          Login Veterinario
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 4,
            color: "#091F5B",
            opacity: 0.8,
          }}
        >
          Ingresa tus credenciales para continuar
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* CORREO */}
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
              },
            }}
            InputLabelProps={{
              style: { fontWeight: "600", color: "#091F5B" },
            }}
          />

          {/* CONTRASEÑA */}
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
              },
            }}
            InputLabelProps={{
              style: { fontWeight: "600", color: "#091F5B" },
            }}
          />

          {/* BOTÓN LOGIN */}
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
            Entrar
          </Button>
        </form>

        {/* REGISTRO */}
        <Typography variant="body2" sx={{ color: "#091F5B", fontWeight: 500 }}>
          ¿No tienes cuenta?{" "}
          <Link
            to="/veterinario/register"
            style={{
              color: "#344EAD",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Regístrate aquí
          </Link>
        </Typography>
      </Paper>

      {/* SNACKBAR */}
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

export default LoginVeterinarian;
