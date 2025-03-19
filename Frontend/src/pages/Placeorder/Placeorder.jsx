import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Placeorder.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Placeorder = () => {
  const { userData, foodlist, cartItems, url, token, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

 
  const subtotal = getTotalCartAmount();
  const gst = Math.floor((subtotal * 12) / 100);
  let delCharge = subtotal < 1000 ? 50 : 0;
  const dummytotal = Math.floor(subtotal + gst + delCharge);


  const discount = subtotal > 1000 ? Math.floor((subtotal * 20) / 100) : 0;
  const total = dummytotal - discount;

  const [input, setInput] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    contact: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const Token = localStorage.getItem("token");
    if (!Token) {
      toast("Please Login First");
      navigate("/");
    }
    setInput({
      name: userData.name || "",
      email: userData.email || "",
      address: userData.address || "",
      city: userData.city || "",
      country: userData.country || "",
      contact: userData.contact || "",
    });
  }, [userData, navigate]);
  console.table(foodlist[0]._id);
  const placeOrder = async (event) => {
    event.preventDefault();
    if (!token) {
      toast("Please Login First");
      navigate("/");
    }
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
      type: "Home Delivery",
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast("Error");
      }
    } catch (error) {
      toast("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <form className="place-order-main" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <div>
            <label>Name:</label>
            <input type="text" placeholder="First Name" name="name" value={input.name} readOnly required />
          </div>
        </div>
        <div>
          <label>Address:</label>
          <input type="text" placeholder="Address" name="address" value={input.address} readOnly required />
        </div>
        <div className="multi-fields">
          <div>
            <label>City:</label>
            <input type="text" placeholder="City" name="city" value={input.city} readOnly required />
          </div>
        </div>
        <div>
          <label>Country:</label>
          <input type="text" placeholder="Country" name="country" value={input.country} readOnly required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" placeholder="Phone" name="contact" value={input.contact} readOnly required />
        </div>
        <button className="edit-button" type="button" onClick={() => navigate("/userprofile")}>
          Edit
        </button>
      </div>

      <div className="place-order-right">
        <h2>Cart Total</h2>
        <div className="order-summary">
          <div className="summary-item">
            <p>Subtotal:</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="summary-item">
            <p>GST (12%):</p>
            <p>₹{gst.toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <p>Delivery Fee:</p>
            <p>₹{delCharge.toFixed(2)}</p>
          </div>
          <hr />

        
          {dummytotal > 1000 && (
            <>
              <div className="summary-item">
                <p>Discount (20% on ₹{subtotal.toFixed(2)}):</p>
                <p>- ₹{discount.toFixed(2)}</p>
              </div>
              <hr />
            </>
          )}

          <div className="summary-item total">
            <b>Total:</b>
            <b>₹{total.toFixed(2)}</b>
          </div>
          <button type="submit" className="payment-btn">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;