import React, { useContext, useEffect, useState  } from "react";
import {useNavigate} from 'react-router-dom'
import "./Placeorder.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-hot-toast";
// import { toast } from "react-toastify";
// import'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Placeorder = () => {
  const { userData, foodlist,cartItems,url,token,getTotalCartAmount } = useContext(StoreContext);
  const subtotal = getTotalCartAmount();
  const gst = (50+(subtotal * 12) / 100);
  const total = subtotal + gst;
  console.log(userData);

  const navigate = useNavigate();
  
  const [input, setInput] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    contact: "",
  });
  useEffect(() => {
    window.scrollTo(0,0);
    if(!token){
      toast("Please Login First ")
      navigate('/');
    }
    else if(getTotalCartAmount()==0){
      toast("Please Login First ")
      navigate('/cart');
    }
    setInput({
      name: userData.name || "",
      email:userData.email || "",
      address:userData.address || "",
      city:userData.city || "",
      country:userData.country || "",
      contact:userData.contact || "",
    });
  }, [userData]);
   console.log("============>",input);


   const placeOrder=async (event)=>{
    event.preventDefault();
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
      type:"Home Delivery",
  }
  console.log(orderData);
  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
  if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url);
  }
  else{
    toast("Error")
  }
   }
   
  return (
    <form className="place-order-main" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <div>
            <label>Name:</label>
            <input type="text" placeholder="First Name" name="name" value={input.name} readOnly required />
          </div>
          {/* <div>
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" required />
          </div> */}
        </div>
        <div>
          <label> Address:</label>
          <input type="text" placeholder=" Address" name="address" value={input.address} readOnly required />
        </div>
        {/* <div>
          <label>Street</label>
          <input type="text" placeholder="Street" required />
        </div> */}
        <div className="multi-fields">
          <div>
            <label>City:</label>
            <input type="text" placeholder="City" name="city" value={input.city} readOnly required />
          </div>
          {/* <div>
            <label>State</label>
            <input type="text" placeholder="State" required />
          </div> */}
        </div>
        <div>
          <label>Country:</label>
          <input type="text" placeholder="Country"  name="country" value={input.country} readOnly required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" placeholder="Phone"  name="contact" value={input.contact} readOnly  required/>
        </div>
        <button  className="edit-button" type="button" onClick={()=>{navigate('/userprofile')}} >Edit</button>
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
            <p>GST (12%) + Delivery Fee:</p>
            <p>₹{gst.toFixed(2)}</p>
          </div>
          <hr />
          <div className="summary-item total">
            <b>Total:</b>
            <b>₹{total.toFixed(2)}</b>
          </div>
          <button  type="submit" className="payment-btn">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
