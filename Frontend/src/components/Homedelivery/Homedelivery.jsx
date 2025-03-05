import React from 'react'
import { useState ,useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import './Homedelivery.css'
import { toast } from "react-hot-toast";
// import { toast } from "react-toastify";
// import'react-toastify/dist/ReactToastify.css';

const Homedelivery = () => {
  const { cartItems, foodlist,addtoCart, removefromCart , getTotalCartAmount } = useContext(StoreContext);
  const subtotal = getTotalCartAmount();
  const gst =Math.floor (50+(subtotal * 12) / 100);
  const total = Math.floor(subtotal + gst);
  const navigate=useNavigate(false);
     useEffect(() => {
        window.scrollTo(0,0);
        console.log(cartItems);
        const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);
        if (isCartEmpty) {
          toast("Please select some items");
          navigate("/");
        }
      
      }, [cartItems, navigate]);
  return (
    <div className="cartItems">
        <div className="cart-item-titles">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add-Item</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodlist.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="main">
                <div className="cart-item-titles cart-items-item" key={index}>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <img onClick={()=>addtoCart(item._id)} src="\Images\add_icon_green.png"  />
                  <img onClick={()=>removefromCart(item._id)} src="\Images\bin.png"  />  
                </div>
                <hr />              
              </div>
            );
          }
        })}
         <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>  GST + Delivery Fee </p>
            {cartItems!=0?<p>₹{gst }</p>:""}
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{total }</b>
          </div>
          <button  onClick={()=>navigate('/Placeorder')}>Proceed to Checkout</button>
        </div>
        {/*<div className="cart-promocode">
          <div>
            <p>If You Have Promo Code, Enter it here.</p>
            <div className="cart-promo">
              <input type="text" placeholder="promocode"/>
              <button>Submit</button>
            </div>
          </div>
        </div>*/}
      </div>
      </div>
    
  )
}

export default Homedelivery