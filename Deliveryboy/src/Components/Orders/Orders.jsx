import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { StoreContext } from "../../context/StoreContextdel";
import DelBoy from "../Animation/DelBoy";
import Foodprocessing from "../Animation/Foodprocessing";
import Delivery from "../Animation/Delivered";
import Delboygoing from "../Animation/delboygoing";
import Delivered from "../Animation/Delivered";
import toast from "react-hot-toast";
import Cancelorder from "../Animation/Cancelorder";

const Orders = ({ SetloginPopUp }) => {
  const { url } = useContext(StoreContext);
  const [orderData, SetorderData] = useState([]);
  const data = JSON.parse(localStorage.getItem("delboydata"));
  const delboyid = data._id;

  const fetchMyorders = async () => {
    try {
      const response = await axios.post(`${url}/api/delBoy/listOrder`, {
        delBoyId: delboyid,
      });

      if (response.data.success) {
        SetorderData(response.data.data);
      } else {
        console.log("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event, delBoyId, orderId) => {
    try {
      const newStatus = event.target.value;

      const response = await axios.post(
        url + "/api/delBoy/updateStatusByDelBoy",
        {
          orderId,
          delBoyId,
          status: newStatus,
        }
      );

      if (response.data.success) {
        toast.success("Status changed!");

        SetorderData((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        fetchMyorders();
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  useEffect(() => {
    SetloginPopUp(false);
    fetchMyorders();
  }, []);

  return (
    <div className="orderdata-body">
      {orderData.length > 0 ? (
        orderData.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-status">
              {order.status == "Food Processing" ? <Foodprocessing /> : null}
              {order.status == "Out for Delivery" ? <Delboygoing /> : null}
              {order.status == "Delivered" ? <Delivered /> : null}
              {order.status == "Cancelled" ? <Cancelorder /> : null}
            </div>

            <div className="food-data">
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <div className="order-name" key={index}>
                    {item.name} X {item.quantity}
                    {index !== order.items.length - 1 && ", "}
                  </div>
                ))}
              </p>
            </div>

            <div className="user-data">
              <p className="order-item-name">Name: {order.userData.name}</p>
              <p className="order-item-address">
                Address: {order.userData.address}, {order.userData.city},{" "}
                {order.userData.country}.
              </p>
              <p className="order-item-contact">
                Contact: {order.userData.contact}
              </p>
            </div>

            <div className="order-details">
              <div>
                <p>Items: {order.items.length}</p>
              </div>
              {/* <p>Delivery Type: {order.delType}</p> */}
              <div>
                <p>Amount: {order.amount}</p>
              </div>
              {order.status == "Cancelled" ? (
                <h2>Cancelled</h2>
              ) : (
                <select
                  onChange={(event) =>
                    statusHandler(event, delboyid, order._id)
                  }
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
