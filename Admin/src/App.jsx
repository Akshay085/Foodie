import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from "./Pages/Orders/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { Toaster} from 'react-hot-toast'
import { toast } from 'react-hot-toast'
import EditPopup from "./Components/Editpopup/EditPopup";
import CategoryPopUp from "./Components/CategoryPopup/CategoryPopUp";
import AddCategory from "./Pages/AddCategory/AddCategory";
import ListCategory from "./Pages/ListCategory/ListCategory";
import AddDeliveryBoy from "./Pages/AddDeliveryBoy/AddDeliveryBoy";
import LoginPopUp from "./Components/LoginPopUp/LoginPopUp";
import Reports from "./Pages/Reports/Reports";

const App = () => {
  const url = "http://localhost:4000";
  const [editpopup, setEditpopup] = useState(false);
  const [categoryeditpopup, categorysetEditpopup] = useState(false);
  const [showLogin, setShowLogin] = useState(!localStorage.getItem("isLoggedIn"));

  const [food, SetFood] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const [category, Setcategory] = useState({
    name: '',
    image: ''
  });

  
  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true"); 
    toast.success("LogIn Successfully")
    setShowLogin(false); 
  };
  const handleLogoutSuccess = () => {
    localStorage.setItem("isLoggedIn", "false"); 
    toast.success("LogOut")
    setShowLogin(true); 
    
  };

  return (
    <div>
        <Toaster 
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <ToastContainer />
      {showLogin ? <LoginPopUp url={url} onLoginSuccess={handleLoginSuccess} /> : (
        <>
          {editpopup && <EditPopup url={url} editpopup={editpopup} setEditpopup={setEditpopup} food={food} SetFood={SetFood} />}
          {categoryeditpopup && <CategoryPopUp url={url} categoryeditpopup={categoryeditpopup} categorysetEditpopup={categorysetEditpopup} category={category} Setcategory={Setcategory} />}
          
          <Navbar handleLogoutSuccess={handleLogoutSuccess} />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Add url={url} />} />
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} editpopup={editpopup} setEditpopup={setEditpopup} food={food} SetFood={SetFood} />} />
              <Route path="/order" element={<Order url={url} />} />
              <Route path="/addcategory" element={<AddCategory url={url} />} />
              <Route path="/listcategory" element={<ListCategory url={url} categoryeditpopup={categoryeditpopup} categorysetEditpopup={categorysetEditpopup} category={category} Setcategory={Setcategory} />} />
              <Route path="/adddeliveryboy" element={<AddDeliveryBoy url={url} />} />
              <Route path="/reports" element={<Reports url={url} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
