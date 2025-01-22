import React, { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import SelfService from "../../components/Self-service/SelfService";

const Cart = () => {
  const { cartItems, foodlist, removefromCart , getTotalCartAmount } = useContext(StoreContext);
  const [selectedservice, setSelectedservice] = useState(false);
  const navigate=useNavigate(false);
  const btnClick=()=>{
    setSelectedservice(!selectedservice);
  }
  return (
    <div className="cart">
      <div className="cartItems">
        <div className="cart-item-titles">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
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
                  <img onClick={()=>removefromCart(item._id)} src="\Images\bin.png"  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="button-container">
      <button
        className="button" 
        onClick={() => btnClick}
      >
        Button 1
      </button>
      <Routes>
          <Route path="/cart/SelfService" element={<SelfService />} />
          <Route path="/cart/SelfService" element={<Placeorder />} />
      </Routes>
    <button className="button">Home Delivery</button>
        </div>
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
            <p>{(getTotalCartAmount()*18)/100 }</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()+(getTotalCartAmount()*18)/100  }</b>
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
  );
};

export default Cart;
