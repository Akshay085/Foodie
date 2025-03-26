import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./SelfService.css";
import { toast } from "react-hot-toast";

const SelfService = () => {
  const {
    url,
    token,
    cartItems,
    userData,
    foodlist,
    addtoCart,
    removefromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  
  const subtotal = Math.floor(getTotalCartAmount());
  const gst = Math.floor((getTotalCartAmount() * 12) / 100);
  const dummytotal = Math.floor(subtotal + gst);
  const discount = subtotal >= 1000 ? Math.floor((subtotal * 20) / 100) : 0;
  const total = dummytotal - discount;

  useEffect(() => {
    window.scrollTo(0, 0);
   // console.log(cartItems);
    const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);
    if (isCartEmpty) {
      toast("Please select some items");
      navigate(-1);
    }
  }, [cartItems, navigate]);

  const selfPayment = async () => {
    let orderItems = [];
    foodlist.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: userData._id,
      items: orderItems,
      amount: subtotal, 
      type: "Self Service",
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast("Please Login First");
      }
    } catch (error) {
      toast("An error occurred. Please try again.");
      console.error(error);
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

      {foodlist.map((item) => {
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
                  className="add-icon-ss"
                  alt="Add"
                />
                <img
                  onClick={() => removefromCart(item._id)}
                  src="/Images/remove_icon_red.png"
                  className="remove-icon-ss"
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
          <hr />

          {dummytotal > 1000 && (
            <>
              <div className="cart-total-details">
                <p>Discount (20% on <b>₹{subtotal}</b>)</p>
                <p>- ₹{discount}</p>
              </div>
              <hr />
            </>
          )}

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{total}</b>
          </div>

          <button type="button" onClick={selfPayment}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelfService;