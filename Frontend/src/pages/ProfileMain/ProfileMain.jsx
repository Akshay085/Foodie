import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../../components/SideBar/SideBar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Navigate } from "react-router-dom";
import "./ProfileMain.css";

const drawerWidth = 240;

const ProfileMain = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar
        position="fixed"
        className="navbar-display"
        sx={{ backgroundColor: "white", height: "64px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "red" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Profile
          </Typography>

          <IconButton
            color="inherit"
            sx={{ color: "red" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box className="layout" sx={{ display: "flex", flexGrow: 1 }}>
        {/* Desktop Drawer */}
        <Drawer
          variant="temporary"
          className="sidebar"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "white",
            },
            display: { xs: "none", sm: "block" },
          }}
        >
          <SideBar handleDrawerClose={handleDrawerToggle} />
        </Drawer>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className="sidebar-mobile"
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "white",
            },
          }}
          ModalProps={{ keepMounted: true }}
        >
          <SideBar handleDrawerClose={handleDrawerToggle} />
        </Drawer>

        <Box
          component="main"
          className="content"
          sx={{
            flexGrow: 1,
            p: 3,
            paddingTop: { xs: "72px", sm: "80px" }, 
          }}
        >
          <Outlet />
        </Box>
       
      </Box>
    </Box>
  );
};

export default ProfileMain;
