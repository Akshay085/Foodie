import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Bag from "../../Components/Animation/Bag";
const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [delboy,setDelboy]=useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(delboy);
    } else {
      toast.error("Error");
    }
  };
  const fetchAllDeliveryBoy = async () => {
    const response = await axios.get(url + "/api/delBoy/list");
    if (response.data.success) {
      setDelboy(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    } 
  };

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
      await fetchAllDeliveryBoy();
    }
  };
  useEffect(() => {
    fetchAllOrders();
    fetchAllDeliveryBoy();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page </h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            {/* <img src="\Images\parcel_icon.png" alt="parcel icon" /> */}
            <Bag />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + +item.quantity + ",";
                  }
                })}
              </p>
              <div className="">
                <p className="order-item-name">
                  {"Name  : " + order.userData.name + " "}
                </p>
                <p className="order-item-address">
                  {"Address : " + order.userData.address + ", "}
                  {order.userData.city + ", " + order.userData.country + "."}
                </p>
                <p className="order-item-contact">
                  {"Contact : " + order.userData.contact + ", "}
                </p>
              </div>
            </div>
            <div>
              {" "}
              <p>Items:{order.items.length}</p>
              <p>Items:{order.delType}</p>
            </div>

            <div>
              {" "}
              <p>Amount:{order.amount}</p>
            </div>
            <div>
              {order.delType === "Home Delivery" ? (
                <select>
                  {delboy.map((boy)=>
                    <option value="boy.name">{boy.name}</option>
                 )}
                  
                </select>
              ) : (
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>
            <p>{order.delType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
