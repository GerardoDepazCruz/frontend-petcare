import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavbarVeterinario() {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Inicio", value: "/veterinario/home", icon: <HomeIcon /> },
    { label: "Citas", value: "/veterinario/citas", icon: <AssignmentIcon /> },
    { label: "Historial", value: "/veterinario/historial", icon: <MedicalServicesIcon /> },
    { label: "Pacientes", value: "/veterinario/pacientes", icon: <PeopleIcon /> },
    { label: "Vacunas", value: "/veterinario/vacunas", icon: <VaccinesIcon /> },
  ];

  return (
    <>
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
        {/* Vista Desktop */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
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
              "& .MuiBottomNavigationAction-label": { fontSize: "1rem" },
              "& .MuiSvgIcon-root": { fontSize: "2.2rem" },
              "& .MuiBottomNavigationAction-root:hover": {
                color: "#344EAD",
                transform: "scale(1.08)",
              },
            }}
          >
            <BottomNavigationAction
              label="Inicio"
              value="/veterinario/home"
              icon={<HomeIcon />}
              component={Link}
              to="/veterinario/home"
            />
            <BottomNavigationAction
              label="Citas"
              value="/veterinario/citas"
              icon={<AssignmentIcon />}
              component={Link}
              to="/veterinario/citas"
            />
            <BottomNavigationAction
              label="Historial"
              value="/veterinario/historial"
              icon={<MedicalServicesIcon />}
              component={Link}
              to="/veterinario/historial"
            />
          </BottomNavigation>

          {/* Logo centrado */}
          <Box sx={{ mx: 2 }}>
            <Link to="/veterinario/home">
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
              "& .MuiBottomNavigationAction-label": { fontSize: "1rem" },
              "& .MuiSvgIcon-root": { fontSize: "2.2rem" },
              "& .MuiBottomNavigationAction-root:hover": {
                color: "#344EAD",
                transform: "scale(1.08)",
              },
            }}
          >
            <BottomNavigationAction
              label="Pacientes"
              value="/veterinario/pacientes"
              icon={<PeopleIcon />}
              component={Link}
              to="/veterinario/pacientes"
            />
            <BottomNavigationAction
              label="Vacunas"
              value="/veterinario/vacunas"
              icon={<VaccinesIcon />}
              component={Link}
              to="/veterinario/vacunas"
            />
          </BottomNavigation>

          {/* Botón Cerrar Sesión */}
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            component={Link}
            to="/logout/veterinario"
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

        {/* Vista Mobile */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          {/* Botón Hamburguesa */}
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              color: "#091F5B",
            }}
          >
            <MenuIcon sx={{ fontSize: "2rem" }} />
          </IconButton>

          {/* Logo */}
          <Link to="/veterinario/home">
            <img
              src="/logo-petcare.jpg"
              alt="PetCare Logo"
              height="50"
              style={{
                cursor: "pointer",
                display: "block",
              }}
            />
          </Link>

          {/* Botón Cerrar Sesión Mobile */}
          <IconButton
            component={Link}
            to="/logout/veterinario"
            sx={{
              color: "#d32f2f",
            }}
          >
            <LogoutIcon sx={{ fontSize: "1.8rem" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Drawer para menú móvil */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 280,
            bgcolor: "#091F5B",
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Logo en el drawer */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "center",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src="/logo-petcare.jpg"
              alt="PetCare Logo"
              height="60"
            />
          </Box>

          {/* Menú Items */}
          <List sx={{ pt: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.value} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.value}
                  selected={value === item.value}
                  sx={{
                    py: 2,
                    "&.Mui-selected": {
                      bgcolor: "#344EAD",
                      "&:hover": {
                        bgcolor: "#344EAD",
                      },
                    },
                    "&:hover": {
                      bgcolor: "rgba(52, 78, 173, 0.5)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: 45,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiTypography-root": {
                        color: "white",
                        fontWeight: 600,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Botón Cerrar Sesión en Drawer */}
          <Box sx={{ p: 2, mt: "auto" }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              component={Link}
              to="/logout/veterinario"
              sx={{
                fontWeight: 600,
                textTransform: "none",
                py: 1.5,
              }}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}