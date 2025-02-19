import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Bag from "../../Components/Animation/Bag";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [delboy, setDelboy] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const fetchAllDeliveryBoy = async () => {
    const response = await axios.get(url + "/api/delBoy/list");
    if (response.data.success) {
      setDelboy(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
      await fetchAllDeliveryBoy();
    }
  };

  const boyStatus = async (dboyid, orderid) => {
    try {
      console.log("Delivery Boy ID:", dboyid);
      console.log("Order ID:", orderid);
      
      const response = await axios.post(
        url + "/api/order/assignDelBoy",
        { orderId: orderid, delBoyId: dboyid },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data.success) {
        toast.success("Delivery Boy Assigned Successfully");
  
        // Update orders state to disable select
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderid ? { ...order, delBoyAssigned: true } : order
          )
        );
      } else {
        alert("Not Available");
        toast.error("Error Assigning Delivery Boy");
      }
    } catch (error) {
      toast.error("Error: " + error.response?.data?.message || error.message);
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
            <Bag />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ",";
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
              <p>Items:{order.items.length}</p>
              <p>Items:{order.delType}</p>
            </div>
            <div>
              <p>Amount:{order.amount}</p>
            </div>
            <div>
              {order.delType === "Home Delivery" ? (
                <select 
                onChange={(e) => boyStatus(e.target.value, order._id)}
                disabled={order.delBoyAssigned}  
              >
                <option value="">Select Delivery Boy</option>
                {delboy.map((boy) => (
                  <option key={boy._id} value={boy._id}>
                    {boy.name}
                  </option>
                ))}
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