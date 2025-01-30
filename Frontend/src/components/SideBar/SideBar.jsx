import React from 'react'
import './SideBar.css'
import {  Link } from 'react-router-dom'
const SideBar = () => {
  
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
      
        <li><Link to="profile">Profile</Link></li> 
        <li><Link to="orders">Orders</Link></li>
        <li><Link to="logout">Logout</Link></li>
      </ul>
      
    </div>
  )
}

export default SideBar