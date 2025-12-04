import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function HomeClient() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div style={{ backgroundColor: "#EFF9FE" }}>
      <main className="home-main">

        {/* Sección 1 */}
        <section
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "flex-start",
            flexWrap: isMobile ? "wrap" : "nowrap",
            backgroundColor: isMobile ? "#091F5B" : "#EFF9FE",
            color: "white",
            padding: "0",
            borderRadius: "0",
            margin: "0",
            maxWidth: "100%",
            minHeight: isMobile ? "auto" : "400px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Imagen */}
          <div
            style={{
              flex: isMobile ? "1 0 100%" : "0 0 52%",
              position: "relative",
              overflow: "visible",
              minHeight: isMobile ? "250px" : "auto",
            }}
          >
            <img
              src="/portada-inicio.jpg"
              alt="Mascota feliz"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Diagonal azul - solo desktop */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                left: "52%",
                top: "0",
                bottom: "0",
                right: "0",
                background: "#091F5B",
                clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)",
                zIndex: 1,
              }}
            ></div>
          )}

          {/* Texto y botón */}
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "20px" : "30px",
              padding: isMobile ? "40px 20px" : "60px 80px 60px 120px",
              position: "relative",
              zIndex: 3,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "1.4rem" : "2.2rem",
                fontWeight: "900",
                lineHeight: "1.75",
                margin: "0",
                letterSpacing: "1px",
                maxWidth: isMobile ? "100%" : "600px",
              }}
            >
              Más que una veterinaria, somos <br />
              el aliado en la salud y bienestar <br />
              de tus mascotas
            </h2>

            <Button
              variant="contained"
              disableElevation
              component={Link}
              to="/cliente/agendarcita"
              sx={{
                backgroundColor: "#344EAD",
                color: "white",
                fontWeight: "900",
                px: isMobile ? 5 : 10,
                py: isMobile ? 1.5 : 2,
                fontSize: isMobile ? "1rem" : "1.2rem",
                textTransform: "none",
                letterSpacing: "0.5px",
                "&:hover": {
                  backgroundColor: "#4A6AB6",
                },
              }}
            >
              Agenda una cita
            </Button>
          </div>
        </section>

        {/* Sección 2 */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "30px" : "60px",
            padding: isMobile ? "40px 20px" : "80px 100px",
            backgroundColor: "#EFF9FE",
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1", maxWidth: isMobile ? "100%" : "600px", textAlign: isMobile ? "center" : "left" }}>
            <h2
              style={{
                fontSize: isMobile ? "1.8rem" : "2.5rem",
                fontWeight: "900",
                color: "#091F5B",
                marginBottom: isMobile ? "20px" : "30px",
                letterSpacing: "1px",
              }}
            >
              SOMOS PETCARE
            </h2>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.3rem",
                lineHeight: "2",
                color: "#091F5B",
                fontWeight: "600",
                marginBottom: isMobile ? "25px" : "40px",
              }}
            >
              Creemos que las mascotas son parte de la familia. <br />
              Contamos con veterinarios especializados, <br />
              atención personalizada y tecnología para <br />
              mantener la salud de tus mejores amigos <br />
              siempre bajo control.
            </p>
            <Button
              variant="contained"
              disableElevation
              component={Link}
              to="/cliente/nosotros"
              sx={{
                backgroundColor: "#344EAD",
                color: "white",
                fontWeight: "900",
                px: isMobile ? 4 : 6,
                py: isMobile ? 1.5 : 2,
                fontSize: isMobile ? "1rem" : "1.1rem",
                textTransform: "none",
                letterSpacing: "0.5px",
                "&:hover": {
                  backgroundColor: "#4A6AB6",
                },
              }}
            >
              Conoce más
            </Button>
          </div>

          <div style={{ flex: "0 0 auto" }}>
            <img
              src="/seccion2-inicio.jpg"
              alt="Equipo PetCare"
              style={{
                width: isMobile ? "100%" : "600px",
                maxWidth: isMobile ? "400px" : "600px",
                height: "auto",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </section>

        {/* Sección 3 */}
        <section
          style={{
            backgroundColor: "#6283FB",
            padding: isMobile ? "40px 20px" : "60px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#091F5B",
              fontSize: isMobile ? "1.8rem" : "2.5rem",
              fontWeight: "900",
              marginBottom: isMobile ? "25px" : "30px",
              letterSpacing: "1px",
            }}
          >
            NUESTROS SERVICIOS
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "center",
              alignItems: "stretch",
              flexWrap: "nowrap",
              gap: isMobile ? "20px" : "50px",
              overflowX: "auto",
              paddingBottom: "30px",
              padding: isMobile ? "0 10px 30px" : "0",
            }}
          >
            {[
              {
                img: "/servicio1.png",
                title: "Odontología",
                desc: "Limpieza, extracciones y cuidado dental profesional.",
              },
              {
                img: "/servicio2.jpg",
                title: "Consultas Médicas",
                desc: "Revisiones generales, diagnósticos y seguimiento de salud.",
              },
              {
                img: "/servicio3.jpg",
                title: "Ecografías",
                desc: "Diagnóstico por imágenes para un cuidado preciso.",
              },
              {
                img: "/servicio4.jpg",
                title: "Cirugías",
                desc: "Procedimientos quirúrgicos generales y especializados.",
              },
              {
                img: "/servicio5.jpeg",
                title: "Vacunas",
                desc: "Vacunas, protección y salud para toda su vida.",
              },
            ].map((servicio, index) => (
              <Card
                key={index}
                sx={{
                  width: isMobile ? 200 : 230,
                  minWidth: isMobile ? 200 : 230,
                  borderRadius: "16px",
                  backgroundColor: "white",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardActionArea component={Link} to="/cliente/servicios">
                  <CardMedia
                    component="img"
                    height={isMobile ? "130" : "150"}
                    image={servicio.img}
                    alt={servicio.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ padding: isMobile ? "14px" : "18px" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "900", color: "#091F5B", fontSize: isMobile ? "1rem" : "1.25rem" }}
                    >
                      {servicio.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        lineHeight: "1.6",
                        fontWeight: 500,
                        fontSize: isMobile ? "0.8rem" : "0.875rem",
                      }}
                    >
                      {servicio.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </section>

        {/* Sección 4 */}
        <section
          style={{
            color: "#091F5B",
            padding: isMobile ? "40px 20px" : "80px 70px",
          }}
        >
          <Grid
            container
            spacing={isMobile ? 4 : 9}
            justifyContent="center"
            alignItems="stretch"
            sx={{ maxWidth: "1500px", margin: "0 auto" }}
          >
            {/* 📨 Formulario */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={7}
                sx={{
                  backgroundColor: "#091F5B",
                  color: "white",
                  padding: isMobile ? "30px 20px" : "50px",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "800",
                    textAlign: "center",
                    marginBottom: isMobile ? "20px" : "30px",
                    letterSpacing: "1px",
                    fontSize: isMobile ? "1.3rem" : "1.5rem",
                  }}
                >
                  Formulario de Contacto
                </Typography>

                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "18px" : "25px",
                  }}
                >
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "#6283FB" },
                      },
                    }}
                  />
                  <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "#6283FB" },
                      },
                    }}
                  />
                  <TextField
                    label="Mensaje"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={isMobile ? 3 : 4}
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "#6283FB" },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      backgroundColor: "white",
                      color: "#091F5B",
                      fontWeight: "900",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      py: isMobile ? 1.2 : 1.4,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#E5E5E5",
                      },
                    }}
                  >
                    Enviar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Información de contacto */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  padding: isMobile ? "20px" : "20px 10px 30px 60px",
                  color: "#091F5B",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "800",
                    mb: isMobile ? 2 : 3,
                    color: "#091F5B",
                    fontSize: isMobile ? "1.3rem" : "1.5rem",
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  Información de Contacto
                </Typography>

                <Typography sx={{ mb: 2, fontSize: isMobile ? "1rem" : "1.2rem", lineHeight: 2.8 }}>
                  📞 <strong>Teléfono:</strong> (01) 6287515 - 958 967 721
                </Typography>
                <Typography sx={{ mb: 2, fontSize: isMobile ? "1rem" : "1.2rem", lineHeight: 2.8 }}>
                  ✉️ <strong>Email:</strong> contacto@petcarevets.com
                </Typography>
                <Typography sx={{ mb: 2, fontSize: isMobile ? "1rem" : "1.2rem", lineHeight: 2.8 }}>
                  🕒 <strong>Horario:</strong> Lunes a Sábado, 9:00 am a 6:00 pm
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </section>

        {/* Sección 5 */}
        <section style={{ padding: isMobile ? "40px 20px" : "50px 70px", backgroundColor: "#EFF9FE" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "900",
              textAlign: "center",
              marginBottom: isMobile ? "30px" : "40px",
              color: "#091F5B",
              fontSize: isMobile ? "1.8rem" : "2.125rem",
            }}
          >
            Encuéntranos en
          </Typography>

          <Grid
            container
            spacing={isMobile ? 4 : 20}
            justifyContent="center"
            alignItems="flex-start"
            sx={{ maxWidth: "1600px", margin: "0 auto" }}
          >
            {/* Columna de imagen */}
            <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
              <img
                src="/seccion5-inicio.png"
                alt="Ubicación PetCare"
                style={{ 
                  width: "100%", 
                  maxWidth: isMobile ? "280px" : "380px", 
                  borderRadius: "12px" 
                }}
              />
              <Typography
                sx={{ 
                  marginTop: 2, 
                  fontSize: isMobile ? "0.95rem" : "1.1rem", 
                  color: "#091F5B" 
                }}
              >
                📍 <strong>Dirección</strong>
                <br />
                Av. Aviación 4945, Santiago de Surco 15038
              </Typography>
            </Grid>

            {/* Columna del mapa */}
            <Grid item xs={12} md={7} sx={{ textAlign: "center" }}>
              <iframe
                title="Mapa PetCare"
                src="https://www.google.com/maps?q=Av.+Aviaci%C3%B3n+4945,+Santiago+de+Surco,+15038,+Per%C3%BA&output=embed"
                width="100%"
                height={isMobile ? "300" : "500"}
                style={{ 
                  border: 0, 
                  borderRadius: "12px",
                  maxWidth: isMobile ? "100%" : "900px",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid>
          </Grid>
        </section>

      </main>
    </div>
  );
}

export default HomeClient;