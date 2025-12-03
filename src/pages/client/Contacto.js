import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function Contacto() {
  return (
    <Box
      sx={{
        backgroundColor: "#EFF9FE",
        padding: { xs: "40px 20px", md: "80px 100px" },
        minHeight: "20vh",
      }}
    >
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              backgroundColor: "#091F5B",
              color: "white",
              padding: "50px 40px",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "900",
                marginBottom: "25px",
                letterSpacing: "1px",
              }}
            >
              Contáctanos
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                marginBottom: "40px",
              }}
            >
              Para cualquier consulta o reserva, comunícate con nosotros a través
              de los siguientes medios:
            </Typography>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "1.2rem",
                lineHeight: "2.2",
              }}
            >
              <li>📧 <strong>Correo:</strong> contacto@petcarevets.com</li>
              <li>📞 <strong>Teléfono:</strong> (01) 6287515 - 958 967 721</li>
              <li>📍 <strong>Dirección:</strong> Av. Aviación 4945, Surco</li>
            </ul>

            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "white",
                color: "#091F5B",
                fontWeight: "900",
                textTransform: "none",
                fontSize: "1rem",
                padding: "10px 25px",
                marginTop: "40px",
                "&:hover": { backgroundColor: "#E5E5E5" },
              }}
            >
              Envíanos un mensaje
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contacto;
