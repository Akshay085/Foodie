import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={`sidebar ${visible ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-icon" onClick={() => setVisible(!visible)}>
          <img src="/Images/sidebarmenu.png" alt="menu" />
        </div>
        {visible && (
          <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
              <img src="/Images/add_icon.png" alt="add icon" />
              <p>Add Items</p>
            </NavLink>

            <NavLink to="/list" className="sidebar-option">
              <img src="/Images/order_icon.png" alt="order icon" />
              <p>List Items</p>
            </NavLink>

            <NavLink to="/addcategory" className="sidebar-option">
              <img src="/Images/add_icon.png" alt="add category" />
              <p>Add Category</p>
            </NavLink>

            <NavLink to="/listcategory" className="sidebar-option">
              <img src="/Images/order_icon.png" alt="list category" />
              <p>List Category</p>
            </NavLink>

            <NavLink to="/order" className="sidebar-option">
              <img src="/Images/order.png" alt="orders" />
              <p>Orders</p>
            </NavLink>

            <NavLink to="/adddeliveryboy" className="sidebar-option">
              <img src="/Images/add_icon.png" alt="add deliveryboy" />
              <p>Add Deliveryboy</p>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
