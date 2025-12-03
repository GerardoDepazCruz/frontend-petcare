import React from "react";
import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "white",
        color: "#091F5B",
        boxShadow: "0px -2px 4px rgba(0,0,0,0.1)",
        mt: 0,
        pt: 4,
        pb: 2,
        px: { xs: 2, md: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Contenedor principal */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 1400,
          mb: 3,
          gap: 6,
        }}
      >
        {/* Logo y redes */}
        <Box sx={{ textAlign: "center" }}>
          <img src="/logo-petcare.jpg" alt="PetCare Logo" height="95" />
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
            <MuiLink
              href="https://www.facebook.com/Petcareoficial/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/facebook.png" alt="Facebook" height="40" />
            </MuiLink>
            <MuiLink
              href="https://www.instagram.com/petcareperu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/instagram.png" alt="Instagram" height="40" />
            </MuiLink>
            <MuiLink href="#" target="_blank" rel="noopener noreferrer">
              <img src="/whatsapp.png" alt="WhatsApp" height="40" />
            </MuiLink>
          </Box>
        </Box>

        {/* Contacto */}
        <Box
          sx={{
            textAlign: "center",
            minWidth: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#344EAD", mb: 0.5 }}
          >
            Contacto
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1, my: 0.9 }}>
            <LocationOnIcon sx={{ color: "#344EAD" }} />
            Av. Aviación 4945, Santiago de Surco 15038
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1, my: 0.9 }}>
            <AccessTimeIcon sx={{ color: "#344EAD" }} />
            Lunes a Sábado. 9:00 am a 6:00 pm
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1, my: 0.9 }}>
            <PhoneIcon sx={{ color: "#344EAD" }} />
            (01) 6287515 - 958 967 721
          </Typography>

        </Box>

        {/* Ayuda y Soporte */}
        <Box
          sx={{
            textAlign: "center",
            minWidth: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.9,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#344EAD", mb: 0.5 }}
          >
            Ayuda y Soporte
          </Typography>
          <Typography sx={{ my: 0.5 }}>
            <MuiLink href="#" underline="hover" color="#091F5B">
              Servicios
            </MuiLink>
          </Typography>
          <Typography sx={{ my: 0.5 }}>
            <MuiLink href="#" underline="hover" color="#091F5B">
              Términos y Condiciones
            </MuiLink>
          </Typography>
          <Typography sx={{ my: 0.5 }}>
            <MuiLink href="#" underline="hover" color="#091F5B">
              Preguntas Frecuentes (FAQ)
            </MuiLink>
          </Typography>

        </Box>

        {/* Libro de reclamaciones */}
        <Box sx={{ textAlign: "center", minWidth: 200 }}>
          <img
            src="/libro-reclamaciones.jpg"
            alt="Libro de Reclamaciones"
            height="80"
          />
          <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: "#1E1E1E", mb: 0.5 }}>Libro de Reclamaciones</Typography>
        </Box>
      </Box>

      <Divider sx={{ width: "100%", maxWidth: 1200, mb: 2 }} />

      <Typography sx={{ fontSize: "1rem", color: "#344EAD", fontWeight: 500 }}>
        © 2025 PetCare Veterinaria. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;
