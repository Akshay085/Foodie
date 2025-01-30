import React from 'react'
import './ProfileMain.css'
import SideBar from '../../components/SideBar/SideBar'
import { Outlet } from "react-router-dom";

const ProfileMain = () => {
  return (
    <div className='Profile-Main'>
        <div className="Profile-Header">
            <h3>Profile</h3>
        </div>
        <div className="Profile-body"> 
            <div className="Body-sidebar">
            <SideBar />
            </div>
            <div className="Bodycontent">
           <Outlet />
            
            </div>
        </div>  
    </div>
  )
}

export default ProfileMain