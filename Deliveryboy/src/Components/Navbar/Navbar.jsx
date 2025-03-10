import React from 'react'
import './Navbar.css'
import {toast} from 'react-hot-toast'
import Logo from '../Animation/Logo'
import { useNavigate } from 'react-router-dom'

const Navbar = ({handleLogoutSuccess}) => {
  const navigate = useNavigate();
   const logOut = () => {
      localStorage.setItem("delboydata", "false");
      toast.success("LogOut");
      navigate("/login");
    };
  return (
    <div className='Navbar-delboy'>
        {/* <img className='logo' src="\Images\foodieslogo.png" alt="logo" /> */}
        <Logo />
        {/* <img className='profile' src="\Images\man.png" alt="admin profile icon" /> */}
        <button  className="navbar-admin-logout " onClick={logOut}>
        Logout
      </button>
    </div>
  )
}

export default Navbar