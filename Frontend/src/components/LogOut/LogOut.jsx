import React   from 'react'

import { useNavigate } from "react-router-dom";
import './LogOut.css'
const LogOut = ({token,setToken}) => {
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");    
    setToken("");
    navigate("/"); 
    window.location.reload();
  };
  return (
  
    <div className="logout-container">
    
    <h2>Are you sure you want to log out?</h2>
    <div className="logout-buttons">
      <button onClick={logout} className="logout-btn">Yes, Logout</button>
      <button  className="cancel-btn">Cancel</button>
      
    </div>
  </div>
  )
}

export default LogOut