import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { StoreContext } from "../../context/StoreContextdel";
import DelBoy from "../Animation/DelBoy";
import Foodprocessing from "../Animation/Foodprocessing";
import Delivery from "../Animation/Delivered";
import Delboygoing from "../Animation/Delboygoing";
import Delivered from "../Animation/Delivered";
import toast from "react-hot-toast";
import Cancelorder from "../Animation/Cancelorder";
import Loader from "../../Components/Animation/Loader"
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Orders = ({ SetloginPopUp }) => {
  const { url } = useContext(StoreContext);
  const [orderData, SetorderData] = useState([]);
  const [loading,setLoading]=useState(false);
  const data = JSON.parse(localStorage.getItem("delboydata"));
  const delboyid = data._id;
  const navigate = useNavigate();
  const fetchMyorders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/delBoy/listOrder`, {
        delBoyId: delboyid,
      });

      if (response.data.success) {
        SetorderData(response.data.data);
      } else {
        toast("Error : Failed to fetch orders");
        // console.log("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      toast("Error : Failed to fetch orders");
      // console.log("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const statusHandler = async (event, delBoyId, orderId) => {
    try {
      // setLoading(true);
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
      toast("Error updating status:");
      // console.log("Error updating status:", error);
    }
    // setLoading(false);
  };
  
  useEffect(() => {
    SetloginPopUp(false);
    fetchMyorders();
  }, []);

  return (
    <div className="orderdata-body">
      {loading==true? <div style={{textAlign:"center"}}><Loader /></div>:<>
      <Navbar />
      
      {orderData.length > 0 ? (
        orderData.map((order, index) => (
          <div key={index} className="order-item">
            {/* {console.log(order)} */}
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
                <h5 style={{ color: "red" }}>Cancelled ❌</h5>
              ) : order?.status == "Delivered" ? (
                <h5 style={{ color: "green" }}>Delivered ✅</h5>
              ):
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
              }
            
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
      
      </>}</div>
  );
};

export default Orders;
