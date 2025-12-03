import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PetsIcon from "@mui/icons-material/Pets";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        bgcolor: "white",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2, 
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 6, 
          maxWidth: 1500,
        }}
      >
        {/* Navegación izquierda */}
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{
            bgcolor: "transparent",
            gap: 4, 
            "& .Mui-selected": {
              color: "#344EAD !important",
              transform: "scale(1.15)",
            },
            "& .MuiBottomNavigationAction-root": {
              color: "#091F5B",
              fontWeight: 600,
              minWidth: 110,
              padding: "12px 16px",
              transition: "all 0.3s ease-in-out",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "1rem", 
            },
            "& .MuiSvgIcon-root": {
              fontSize: "2.2rem",
            },
            "& .MuiBottomNavigationAction-root:hover": {
              color: "#344EAD",
              transform: "scale(1.08)",
            },
          }}
        >
          <BottomNavigationAction
            label="Inicio"
            value="/cliente/home"
            icon={<HomeIcon />}
            component={Link}
            to="/cliente/home"
          />
          <BottomNavigationAction
            label="Nosotros"
            value="/cliente/nosotros"
            icon={<InfoIcon />}
            component={Link}
            to="/cliente/nosotros"
          />
          <BottomNavigationAction
            label="Contacto"
            value="/cliente/contacto"
            icon={<ContactMailIcon />}
            component={Link}
            to="/cliente/contacto"
          />
          <BottomNavigationAction
            label="Mascota"
            value="/cliente/mascota"
            icon={<PetsIcon />}
            component={Link}
            to="/cliente/mascota"
          />
        </BottomNavigation>

        {/* Logo centrado */}
        <Box sx={{ mx: 2 }}>
          <Link to="/cliente/home">
            <img
              src="/logo-petcare.jpg"
              alt="PetCare Logo"
              height="70"
              style={{
                cursor: "pointer",
                display: "block",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Link>
        </Box>

        {/* Navegación derecha */}
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{
            bgcolor: "transparent",
            gap: 4,
            "& .Mui-selected": {
              color: "#344EAD !important",
              transform: "scale(1.15)",
            },
            "& .MuiBottomNavigationAction-root": {
              color: "#091F5B",
              fontWeight: 600,
              minWidth: 110,
              padding: "12px 16px",
              transition: "all 0.3s ease-in-out",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "1rem",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "2.2rem",
            },
            "& .MuiBottomNavigationAction-root:hover": {
              color: "#344EAD",
              transform: "scale(1.08)",
            },
          }}
        >
          <BottomNavigationAction
            label="Servicios"
            value="/cliente/servicios"
            icon={<MiscellaneousServicesIcon />}
            component={Link}
            to="/cliente/servicios"
          />
          <BottomNavigationAction
            label="AgendarCita"
            value="/cliente/agendarcita"
            icon={<EventAvailableIcon />}
            component={Link}
            to="/cliente/agendarcita"
          />
        </BottomNavigation>

        {/* Botón Cerrar Sesión */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          component={Link}
          to="/logout/cliente"
          sx={{
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.9rem",
            padding: "8px 18px",
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
              transform: "scale(1.08)",
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  );
}
