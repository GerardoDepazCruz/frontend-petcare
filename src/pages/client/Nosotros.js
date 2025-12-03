import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Nosotros() {
  return (
    <Box
      sx={{
        backgroundColor: "#EFF9FE",
        minHeight: "auto",
        padding: { xs: "20px 0px", md: "80px 80px" },
      }}
    >
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Texto */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: "#091F5B",
              marginBottom: "30px",
              letterSpacing: "1px",
            }}
          >
            Nosotros
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              lineHeight: 2,
              fontWeight: 600,
              color: "#091F5B",
            }}
          >
            Somos una clínica veterinaria dedicada al cuidado integral de tus mascotas,
            brindando servicios de calidad y confianza para su bienestar. Nuestro equipo
            de profesionales se compromete a ofrecer atención personalizada y tecnología
            de vanguardia para garantizar la salud y felicidad de tus mejores amigos.
          </Typography>
        </Grid>

        {/* Imagen */}
        <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
          <img
            src="/seccion2-inicio.jpg" 
            alt="Equipo PetCare"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Nosotros;
