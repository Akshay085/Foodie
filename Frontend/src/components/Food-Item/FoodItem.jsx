import React, { useContext} from 'react'
import './FoodItem.css'
import { StoreContext } from '../../Context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {

      const {cartItems,addtoCart,removefromCart,url} =useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img  className='food-item-image' src={image} alt=""  />
            {cartItems?
              cartItems[id]==null? <img className='add' onClick={()=>addtoCart(id)} src="\Images\add_icon_green.png" alt="add Item Img" />
               : <div className='Food-item-counter'> 
              {cartItems[id]<=0?"":<img onClick={() =>removefromCart(id)} src="\Images\remove_icon_red.png" alt="remove icon"  /> }
              {cartItems[id]<=0?"":<p>{cartItems[id]}</p>}
             
              <img onClick={()=>addtoCart(id)} src="\Images\add_icon_green.png" alt="add icon" />
               </div>
           :null }
            
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p >{name}</p>
                {/* <img src='\Images\rating_starts.png' alt="" /> */}
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItem