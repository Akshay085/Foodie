import React from 'react'
import "./SelfPlaceorder.css"

const SelfPlaceorder = () => {
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
    // console.log(orderItems);
     let orderData={
      userId:userData._id,
      // address:input,
      items:orderItems,
      amount:subtotal,
      type:"Home Delivery",
  }
 // console.log(orderData);
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
    <div>SelfPlaceorder</div>
  )
}

export default SelfPlaceorder