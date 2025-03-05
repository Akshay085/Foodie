import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import DeliveryComponent from "../../components/DeliveryComponent/DeliveryComponent";
import Home from "../Home/Home";
import Search from "../Search/Search";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import'react-toastify/dist/ReactToastify.css';
import EmptyCart from "../../components/MyLottieAnimation/EmptyCart";

const Cart = () => {
  const { cartItems, foodlist,addtoCart, removefromCart , getTotalCartAmount } = useContext(StoreContext);
  // const [bool, setBool] = useState(false);
  const [cartEmpty,setCartEmpty]=useState(false);
  const navigate=useNavigate(false);
  useEffect(() => {
    window.scrollTo(0,0);
    console.log(cartItems);
    const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);
    if (isCartEmpty) {
      setCartEmpty(true);
       toast("Please Add some items in to Cart");
      // navigate("/");
    }
    // if (Object.keys(cartItems).length === 0) {
    //   navigate("/");
    //   toast.warn("please Select some item");
    // }
    
  }, [cartItems, navigate]);
  
  return (
    <div className="cart">
      {cartEmpty==true ? 
      
      <div className="empty-cart">
        <EmptyCart  />
      <br />
      <h1>Cart Is Empty...</h1>
      <button onClick={()=>{navigate("/")}}>Buy Now</button>
      <br />
      </div>  
      : <>
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
              <div className="main" key={index}>
                <div className="cart-item-titles cart-items-item" >
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <img onClick={()=>addtoCart(item._id)} src="\Images\add_icon_green.png"  />
                  <img onClick={()=>removefromCart(item._id)} src="\Images\remove_icon_red.png"  />   
                </div>
                <hr />
              </div>
            );
          }
         
        })}
      </div>
     <DeliveryComponent />
      {/*<div className="cart-bottom">
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
        <div className="cart-promocode">
          <div>
            <p>If You Have Promo Code, Enter it here.</p>
            <div className="cart-promo">
              <input type="text" placeholder="promocode"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>*/}
</>}
    </div>
  );
};

export default Cart;
