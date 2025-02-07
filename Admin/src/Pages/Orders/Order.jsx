import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page </h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src="\Images\parcel_icon.png" alt="parcel icon" />
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
              <p className="order-item-name">{ order.userData.name + " " }</p>
              <p className="order-item-address">{ order.userData.address + ", " }</p>
              <p className="order-item-name">{ order.userData.city + ", " }</p>
              <p className="order-item-name">{ order.userData.country + " ," }</p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
