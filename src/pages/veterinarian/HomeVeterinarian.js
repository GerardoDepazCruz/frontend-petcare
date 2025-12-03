import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function HomeVeterinarian() {
  const opciones = [
    { title: "Citas", desc: "Gestiona las citas programadas de tus pacientes.", link: "/veterinario/citas", color: "#344EAD" },
    { title: "Historial Clínico", desc: "Accede y administra los historiales médicos.", link: "/veterinario/historial", color: "#6283FB" },
    { title: "Pacientes", desc: "Visualiza y administra la información de tus pacientes.", link: "/veterinario/pacientes", color: "#4A6AB6" },
    { title: "Vacunas", desc: "Controla el calendario de vacunación de cada mascota.", link: "/veterinario/vacunas", color: "#091F5B" },
  ];

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "50vh", paddingBottom: "50px" }}>
      
      {/* 🌟 Sección de bienvenida */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 900, color: "#091F5B", marginBottom: 2 }}>
          Bienvenido al Panel del Veterinario
        </Typography>
        <Typography variant="h6" sx={{ color: "#091F5B", maxWidth: "700px", marginBottom: 4, lineHeight: 1.8 }}>
          Esta es la página principal para el veterinario, donde puedes gestionar citas, historial clínico, pacientes y control de vacunas.
        </Typography>

        <img
          src="/veterinario1.jpg"
          alt="Veterinario"
          style={{
            width: "1000px",
            maxWidth: "90%",
            borderRadius: "25px",
            marginTop: "40px",
            marginBottom: "40px",
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.20)",
            objectFit: "cover"
          }}
        />

        <Typography variant="body1" sx={{ color: "#091F5B", maxWidth: "600px" }}>
          Selecciona una opción del menú para comenzar.
        </Typography>

      </section>
    </div>
  );
}

export default HomeVeterinarian;
