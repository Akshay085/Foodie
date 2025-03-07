import React, { useContext, useEffect, useState } from 'react'
import './OrderPage.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import Bag from '../MyLottieAnimation/Bag';
import FoodProccessing from '../MyLottieAnimation/FoodProccessing';
import Delivered from '../MyLottieAnimation/Delivered';
import OutForDelivery from '../MyLottieAnimation/OutForDelivery';
import Canceled from '../MyLottieAnimation/Canceled';
import Loader from "../../components/MyLottieAnimation/Loaderfrount.jsx"

const OrderPage = () => {

  const {url,token}=useContext(StoreContext);
 const [data,setData]=useState([]);
 const [loading,setLoading]=useState(false)

  const fetchOrders=async()=>{
    setLoading(true);
    const response=await axios.post(url+"/api/order/userorder",{},{headers:{token}});
    if(response.data.success){
    setData(response.data.data);
    console.log(response.data.data);
    setLoading(true);
    }
    else{
      setLoading(true);
      console.log("error")
    }
  }
  const deleteOrder=async(orderid)=>{
    console.log("****************",orderid);
    const response =await axios.post(url +"/api/order/cancelOrder",{orderId: orderid},{headers:{token}});
    if(response.data.success){
    
      fetchOrders();
    }
    else{
      console.log("errror");
      fetchOrders();
    }
  }
  useEffect(()=>{
      if(token){
        fetchOrders();
      }
  },[token])
  return (

    <div  className='OrderPage'>
      <h2>My Orders</h2>   
      
      <div className="order-container">
        
        {loading ==true && <div className='loader-category-list'><Loader/></div>}
        {data.map((order,index)=>{
          return(
            <div  key={index}className='my-orders-order'>
              {/* <Bag /> */}
              {order.status=="Food Processing"?<FoodProccessing />:null}
              {order.status=="Receive Order"?<Delivered />:null}
              {order.status=="Out for Delivery"?<OutForDelivery />:null}
              {order.status=="Received"?<Delivered />:null}
              {order.status=="Delivered"?<Delivered />:null}
              {order.status=="Cancelled"?<Canceled />:null}
                  {/* <img src="\Images\parcel_icon.png" alt="parcel icon" /> */}
                  <p>{order.items.map((item,index)=>{
                  
                     if(index === order.items.length-1){
                         return item.name + " x " + item.quantity
                     }
                     else{
                      return item.name + " x " + item.quantity +","
                     }
                  })}</p>
                  <p> ₹{order.amount}</p>
                  <p>Items:{order.items.length}</p>
                  <p><span>&#x25cf;</span><b>{order.status}</b></p>
                  {/* {console.log("----------------->",order._id)} */}
                 {order.status=="Food Processing"?<button onClick={()=>{deleteOrder(order._id)}}>Cancel</button>:null} 
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderPage