import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import './DeliveryComponent.css'
const DeliveryComponent = () => {
  return (
   
        <div className="button-container">
          <Link to="/cart/self-service"  className="link-button">self-service</Link>
          <Link to="/cart/home-delivery" className="link-button">home-delivery</Link>
     
    </div>
  )
}

export default DeliveryComponent