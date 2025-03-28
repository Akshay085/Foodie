import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
// import { toast } from "react-toastify";
import Bag from "../../Components/Animation/Bag";
import Delboygoing from "../../Components/Animation/Delboygoing";
import Delivered from "../../Components/Animation/Delivered";
import Foodprocessing from "../../Components/Animation/Foodprocessing";
import CancelOrder from "../../Components/Animation/CancelOrder";
import { Rating } from "@mui/material";
import Loader from "../../Components/Animation/Loader";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [delboy, setDelboy] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchAllOrders = async () => {
    setLoader(true);
    try {
      const response = await axios.get(url + "/api/order/list");
      // console.log("Orders Fetched:", response.data.data);

      if (response.data && response.data.success) {
        setOrders(response.data.data);
        await fetchFeedback(response.data.data);
      } else {
        toast("Error fetching orders");
      }
    } catch (error) {
      toast("Failed to fetch orders");
    }
    setLoader(false);
  };

  const fetchAllDeliveryBoy = async () => {
    setLoader(true);
    try {
      const response = await axios.get(url + "/api/delBoy/list");
      if (response.data.success) {
        setDelboy(response.data.data);
      } else {
        toast("Error fetching delivery boys");
      }
    } catch (error) {
      toast("Failed to fetch delivery boys");
    }
    setLoader(false);
  };
  const fetchFeedback = async (orders) => {
    setLoader(true);
    try {
      const orderIds = orders.map((order) => order._id);
      const response = await axios.post(url + "/api/review/get", { orderIds });
      // console.log(response)
      if (response.data.success && response.data.review) {
        setFeedbackData(response.data.review);
      } else {
        setFeedbackData({});
      }
    } catch (error) {
      console.log("Error fetching feedback:", error);
      setFeedbackData({});
    }
    setLoader(false);
  };

  const statusHandler = async (event, orderId) => {
    setLoader(true);
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      toast("Error updating status");
    }
    setLoader(false);
  };

  const boyStatus = async (dboyid, orderid) => {
    setLoader(true);
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
            order._id === orderid
              ? { ...order, delBoyAssigned: true, delBoyId: dboyid }
              : order
          )
        );
      } else {
        toast("Error Assigning Delivery Boy");
      }
    } catch (error) {
      toast("Error: " + (error.response?.data?.message || error.message));
    }
    setLoader(false);
  };
  const exportToExcel = () => {
    if (orders.length === 0) {
      toast("No orders to export");
      return;
    }
    const data = orders.map((order, index) => ({
      "Order No.": index + 1,
      "Customer Name": order.userData.name,
      Address: `${order.userData.address}, ${order.userData.city}, ${order.userData.country}`,
      Contact: order.userData.contact,
      Items: order.items
        .map((item) => `${item.name} X ${item.quantity}`)
        .join(", "),
      "Delivery Type": order.delType,
      Amount: order.amount,
      Status: order.status,
      "Assigned Delivery Boy": order.delBoyId
        ? delboy.find((boy) => boy._id === order.delBoyId)?.name ||
          "Not Assigned"
        : "Self service",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "Orders.xlsx");
    toast.success("Orders exported to Excel");
  };

  useEffect(() => {
    fetchAllOrders();
    fetchAllDeliveryBoy();
  }, []);

  return (
    <div className="order add">
      {loader?<div><Loader /></div>:<>
      <div className="order-list">
        <div>
          <h3>Order Page</h3>
          <button
            className="excel-button"
            onClick={() => exportToExcel(orders)}
          >
            Download Orders as Excel
          </button>
        </div>
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            {/* {console.log("@@@@@@@@@@",order.status)} */}
            {order.status === "Cancelled" ? (
              <CancelOrder />
            ) : order.status === "Food Processing" ? (
              <Foodprocessing />
            ) : order.status === "Out for Delivery" ? (
              <Delboygoing />
            ) : ["Delivered", "Received", "Receive Order"].includes(
                order.status
              ) ? (
              <Delivered />
            ) : (
              <Bag />
            )}

            <div>
              <p className="order-item-food">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <span key={index}>
                      {/* {console.log("------------>",order.status) } */}
                      {item.name} X {item.quantity}
                      {index !== order.items.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>No Items</span>
                )}
              </p>
              <div>
                <p className="order-item-name">
                  {"Name: " + order.userData.name}
                </p>
                <p className="order-item-address">
                  {"Address: " + order.userData.address + ", "}
                  {order.userData.city + ", " + order.userData.country + "."}
                </p>
                <p className="order-item-contact">
                  {"Contact: " + order.userData.contact}
                </p>
              </div>
            </div>
            <div>
              <p>Items: {order.items.length}</p>
              <p>
                Delivery Type:
                <br /> {order.delType}
                <br></br>
                <br /> Payment Method:
                <br /> {order.paymentMethod}
              </p>
            </div>
            <div>
              <p>Amount: {order.amount}</p>
            </div>
            <div>
              {order.delType === "Home Delivery" ? (
                order.delBoyId ? (
                  <p>
                    Assigned to:{" "}
                    {delboy.find((boy) => boy._id === order.delBoyId)?.name ||
                      "Unknown"}
                    <br />
                    <span className="ordrestatus-color">
                      <ul>
                        {order.status == "Cancelled" ? (
                          <li style={{ color: "red" }}>{order.status}</li>
                        ) : (
                          <li style={{ color: "green" }}>{order.status}</li>
                        )}
                        {/* <li >{order.status=="Cancelled"?}</li> */}
                      </ul>
                    </span>
                  </p>
                ) : order.status === "Cancelled" ? (
                  <h4 style={{ color: "red" }}>Cancelled</h4>
                ) : (
                  <select
                    onChange={(e) => boyStatus(e.target.value, order._id)}
                  >
                    <option value="">Select Delivery Boy</option>
                    {delboy.map((boy) => (
                      <option key={boy._id} value={boy._id}>
                        {boy.name}
                      </option>
                    ))}
                  </select>
                )
              ) : order.status === "Cancelled" ? (
                <h4 style={{ color: "red" }}>Cancelled</h4>
              ) : order.status === "Received" ? (
                <h4 style={{ color: "green" }}>Received</h4>
              ) : (
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  {/* {console.log(order.status)} */}
                  <option value="Food Processing">Food Processing</option>
                  <option value="Receive Order">Receive Order</option>
                  <option value="Received">Received</option>
                </select>
              )}
              {(order.status == "Delivered" || order.status == "Received") &&
                (feedbackData[order._id] ? (
                  <div>
                    <p>Rating:</p>
                    <Rating value={feedbackData[order._id]} readOnly />
                  </div>
                ) : (
                  <p>No feedback yet.</p>
                ))}
            </div>
          </div>
        ))}
      </div>
      </>} </div>
  );
};

export default Order;
