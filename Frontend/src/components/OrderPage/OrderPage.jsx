import React, { useContext, useEffect, useState } from "react";
import "./OrderPage.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import Bag from "../MyLottieAnimation/Bag";
import FoodProccessing from "../MyLottieAnimation/FoodProccessing";
import Delivered from "../MyLottieAnimation/Delivered";
import OutForDelivery from "../MyLottieAnimation/OutForDelivery";
import Canceled from "../MyLottieAnimation/Canceled";
import Loader from "../../components/MyLottieAnimation/Loaderfrount.jsx";
import FeedBack from "../../components/Feedback/FeedBack.jsx";
import { Rating } from "@mui/material";
import { toast } from "react-hot-toast";

const OrderPage = () => {
  const { url, token, userData } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});

  const userId = userData ? userData._id : null;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userorder",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setData(response.data.data);
        await fetchFeedback(response.data.data);
      } else {
        toast.success("please try again")
        // console.log("Error fetching orders");
      }
    } catch (error) {
      //console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const fetchFeedback = async (orders) => {
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
  };

  const deleteOrder = async (orderId) => {
    const response = await axios.post(
      url + "/api/order/cancelOrder",
      { orderId },
      { headers: { token } }
    );

    if (response.data.success) {
      fetchOrders();
    } else {
     // console.log("Error canceling order");
      fetchOrders();
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="OrderPage">
      <h2>My Orders</h2>

      <div className="order-container">
        {loading && (
          <div className="loader-category-list">
            <Loader />
          </div>
        )}
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            {order.status === "Food Processing" && <FoodProccessing />}
            {order.status === "Receive Order" && <Delivered />}
            {order.status === "Out for Delivery" && <OutForDelivery />}
            {order.status === "Received" && <Delivered />}
            {order.status === "Delivered" && <Delivered />}
            {order.status === "Cancelled" && <Canceled />}

            <p>
              {order.items.map((item, idx) =>
                idx === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>
            <p> ₹{order.amount}</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
              <br />
              <br />
               Payment Method:
                <br /> {order.paymentMethod}
            </p>

            {order.status === "Food Processing" && (
              <button onClick={() => deleteOrder(order._id)}>Cancel</button>
            )}

            {(order.status === "Delivered" || order.status === "Received") &&
              (feedbackData[order._id] ? (
                <div>
                  <p>Your Rating:</p>
                  <Rating value={feedbackData[order._id]} readOnly />
                </div>
              ) : (
                <FeedBack
                  orderId={order._id}
                  fetchFeedback={fetchFeedback}
                  userId={userId}
                  orders={data}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;