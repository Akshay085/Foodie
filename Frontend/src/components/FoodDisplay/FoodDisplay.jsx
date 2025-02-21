import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../Food-Item/FoodItem';
const FoodDisplay = ({category}) => {
    const {foodlist} =useContext(StoreContext);
  return (
    <div className='food-display' id="fooddisplay">
        <h2>Top Dishes Are Here.</h2>
        <div className="food-display-list">
            {foodlist.map((item,i)=>{
              if(category==undefined || category==='All'  || category===item.category){
               return <FoodItem key={i} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }
               
            })}
        </div>
    </div>
  )
}

export default FoodDisplay