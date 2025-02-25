import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
  const navigate=useNavigate();
  const View=()=>{
    navigate("/search")             
  }
  return (
    <section className='header' id='header'>    
        <div className="headercontents">
            <h2>Order Your Favourite Food Hear</h2>
            <p>Choose From A Diverse Menu Featuring A Delectable Array of Dishes Crafted With The Finest Ingradients and Culinary Expertise.Our Mission Is to Satisfy Your  Cravings And Elevate Your Dining Experience , One Delicious Meal At a Time</p>
            <div className="btnmenu" onClick={View}><button>View Menu</button></div>
        </div>
    </section>
  )
}

export default Header                                                 