import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <NavLink  to='/add' className="sidebar-option">
          <img src="\Images\add_icon.png" alt="add icon" />
          <p>Add Items</p>
        </NavLink>

        <NavLink  to='/list' className="sidebar-option">
          <img src="\Images\order_icon.png" alt="order icon" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/addcategory' className="sidebar-option">
          <img src="\Images\add_icon.png"  alt="order icon" />
          <p>Add category</p>
        </NavLink>

        <NavLink  to='/listcategory' className="sidebar-option">
          <img src="\Images\order_icon.png" alt="order icon" />
          <p>List Category</p>
        </NavLink>

        <NavLink to='/order' className="sidebar-option">
          <img src="\Images\order.png" alt="order icon" />
          <p>Orders</p>
        </NavLink>

       
      </div>  
    </div>
  )
}

export default Sidebar