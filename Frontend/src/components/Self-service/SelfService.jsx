import React from 'react'
import { useState } from "react";
import { useContext } from "react";
import axios from 'axios';
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import './SelfService.css'

const SelfService = () => {
  const { url,token,cartItems,userData, foodlist,addtoCart, removefromCart , getTotalCartAmount } = useContext(StoreContext);
  const navigate=useNavigate(false);
  const subtotal = getTotalCartAmount();
  const selfPayment=async()=>{
    
      let orderItems =[];
      foodlist.map((item)=>{
        if(cartItems[item._id]>0){
          let itemInfo =item;
          itemInfo["quantity"]= cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
       console.log(orderItems);
       let orderData={
        userId:userData._id,
        // address:input,
        items:orderItems,
        amount:subtotal,
        type:"Self Service",
    }
    console.log(orderData);
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else{
      toast.error("Error")
    }
 }
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
              <div className="main" key={item._id}>
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
            <p>  GST </p>
            <p>₹{(getTotalCartAmount()*12)/100 }</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()+(getTotalCartAmount()*12)/100  }</b>
          </div>
          <button type="button" onClick={selfPayment}>Proceed To Payment</button>
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

export default SelfService