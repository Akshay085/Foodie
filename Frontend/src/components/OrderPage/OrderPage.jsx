import React, { useContext, useEffect, useState } from 'react'
import './OrderPage.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import Bag from '../MyLottieAnimation/Bag';

const OrderPage = () => {

  const {url,token}=useContext(StoreContext);
 const [data,setData]=useState([]);

  const fetchOrders=async()=>{
    const response=await axios.post(url+"/api/order/userorder",{},{headers:{token}});
    if(response.data.success){
    setData(response.data.data);
    console.log(response.data.data);
    }
    else{
      console.log("error")
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
        {data.map((order,index)=>{
          return(
            <div  key={index}className='my-orders-order'>
              <Bag />
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
                 {order.status=="Food Processing"?<button>Cancel</button>:<button>Track Order</button>} 
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderPage