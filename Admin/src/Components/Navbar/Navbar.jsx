import React from 'react'
import './Navbar.css'

import Logo from '../Animation/Logo'

const Navbar = ({handleLogoutSuccess}) => {
  return (
    <div className='Navbar'>
        {/* <img className='logo' src="\Images\foodieslogo.png" alt="logo" /> */}
        <Logo />
        {/* <img className='profile' src="\Images\man.png" alt="admin profile icon" /> */}
        <button className='navbar-admin-logout' onClick={()=>handleLogoutSuccess()}>Logout</button>
    </div>
  )
}

export default Navbar