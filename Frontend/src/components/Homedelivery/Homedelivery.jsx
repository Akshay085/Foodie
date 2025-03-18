import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Homedelivery.css";
import { toast } from "react-hot-toast";

const Homedelivery = () => {
  const { token, cartItems, foodlist, addtoCart, removefromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const gst = Math.floor((subtotal * 12) / 100);
  let delCharge = subtotal < 1000 ? 50 : 0; 
  const dummytotal = Math.floor(subtotal + gst + delCharge);

  const discount = dummytotal > 1000 ? Math.floor((dummytotal * 20) / 100) : 0;
  const total = dummytotal - discount;

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(cartItems);
    const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);
    if (isCartEmpty) {
      toast("Please select some items");
      navigate("/");
    }
  }, [cartItems, navigate]);

  const proceedToCheckOut = () => {
    if (!token) {
      toast("Please login first");
    } else {
      navigate("/Placeorder");
    }
  };

  return (
    <div className="cartItems">
      <div className="cart-item-titles">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Add</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {foodlist.map((item, index) => {
        if (cartItems[item._id] > 0) {
          return (
            <div className="main" key={item._id}>
              <div className="cart-item-titles cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <img
                  onClick={() => addtoCart(item._id)}
                  src="/Images/add_icon_green.png"
                  alt="Add"
                />
                <img
                  onClick={() => removefromCart(item._id)}
                  src="/Images/remove_icon_red.png"
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>GST (12%)</p>
            <p>₹{gst}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{delCharge}</p>
          </div>
          <hr />

          
          {dummytotal > 1000 && (
            <>
              <div className="cart-total-details">
                <p>Discount (20% on <b>₹{dummytotal}</b>)</p>
                <p>- ₹{discount}</p>
              </div>
              <hr />
            </>
          )}

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{total}</b>
          </div>
          <button onClick={proceedToCheckOut}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Homedelivery;