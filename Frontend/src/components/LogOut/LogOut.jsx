import React ,{useState}  from 'react'

import { useNavigate } from "react-router-dom";
import './LogOut.css'

import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
const LogOut = ({token,setToken}) => {
 
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    localStorage.removeItem("cartItems"); 

    setToken("");
    navigate("/"); 
    window.location.reload();
  };
  return (
  
    <div className="logout-container">
    
    <h2>Are you sure you want to log out?</h2>
    <div className="logout-buttons">
      <button onClick={logout} className="logout-btn">Yes, Logout</button>
      <button  className="cancel-btn" onClick={()=>{navigate('/userprofile')}}>Cancel</button>
    
    </div>
    
  </div>
  )
}

export default LogOut