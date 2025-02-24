import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from 'react-hot-toast'
// import { toast } from "react-toastify";
import Bag from "../../Components/Animation/Bag";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [delboy, setDelboy] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data && response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const fetchAllDeliveryBoy = async () => {
    try {
      const response = await axios.get(url + "/api/delBoy/list");
      if (response.data.success) {
        setDelboy(response.data.data);
      } else {
        toast.error("Error fetching delivery boys");
      }
    } catch (error) {
      toast.error("Failed to fetch delivery boys");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const boyStatus = async (dboyid, orderid) => {
    try {
      const response = await axios.post(
        url + "/api/order/assignDelBoy",
        { orderId: orderid, delBoyId: dboyid },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("Delivery Boy Assigned Successfully");

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderid ? { ...order, delBoyAssigned: true, delBoyId: dboyid } : order
          )
        );
      } else {
        toast.error("Error Assigning Delivery Boy");
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchAllDeliveryBoy();
  }, []);

  return (
    <div className="order add">
      <div className="order-list">
        <h3>Order Page</h3>
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <Bag />
            <div>
              <p className="order-item-food">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} X {item.quantity}
                      {index !== order.items.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>No Items</span>
                )}
              </p>
              <div>
                <p className="order-item-name">{"Name: " + order.userData.name}</p>
                <p className="order-item-address">
                  {"Address: " + order.userData.address + ", "}
                  {order.userData.city + ", " + order.userData.country + "."}
                </p>
                <p className="order-item-contact">{"Contact: " + order.userData.contact}</p>
              </div>
            </div>
            <div>
              <p>Items: {order.items.length}</p>
              <p>Delivery Type:<br/> {order.delType}</p>
            </div>
            <div>
              <p>Amount: {order.amount}</p>
            </div>
            <div>
              {order.delType === "Home Delivery" ? (
                order.delBoyId ? (
                  <p>
                    Assigned to:{" "}
                    {delboy.find((boy) => boy._id === order.delBoyId)?.name || "Unknown"}
                  </p>
                ) : (
                  <select onChange={(e) => boyStatus(e.target.value, order._id)}>
                    <option value="">Select Delivery Boy</option>
                    {delboy.map((boy) => (
                      <option key={boy._id} value={boy._id}>
                        {boy.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
