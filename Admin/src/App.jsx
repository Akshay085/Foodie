import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from "./Pages/Orders/Order";
import { ToastContainer } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import EditPopup from "./Components/Editpopup/EditPopup";

const App = () => {
  const url="http://localhost:4000";
  const [editpopup, setEditpopup] = useState(false);
  const [food,SetFood]=useState({
    name:"",
    description:"",
    price:"",
    category:"",
    image:""
  })
  
  return (
    <div>
      {editpopup ?<EditPopup url={url} editpopup={editpopup} setEditpopup={setEditpopup} food={food} SetFood={SetFood} />:<></>}
      <ToastContainer />
      <Navbar />
      <hr />
  
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url} editpopup={editpopup}  setEditpopup={setEditpopup} food={food} SetFood={SetFood} />} />
          <Route path="/order" element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
