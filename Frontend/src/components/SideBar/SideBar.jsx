import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {isMobile} from 'react-device-detect';


const SideBar = ({handleDrawerClose}) => {

  return (
    <Box style={{position:"relative",width:"100%"}}>
      {isMobile &&  
        <IconButton aria-label="menubutton" className="menubutton-top" onClick={handleDrawerClose} >
        <MenuIcon  />
      </IconButton>
      }
      <div className="link-content">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="orders">Orders</Link></li>
          <li><Link to="logout">Logout</Link></li>
        </ul>
      </div>
    </Box>
  );
};

export default SideBar;
