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
import  CategoryPopUp, {} from "./Components/CategoryPopup/CategoryPopUp"
import AddCategory from "./Pages/AddCategory/AddCategory";
import ListCategory from "./Pages/ListCategory/ListCategory";


const App = () => {
  const url="http://localhost:4000";
  const [editpopup, setEditpopup] = useState(false);
  const [categoryeditpopup, categorysetEditpopup] = useState(false);
  const [food,SetFood]=useState({
    name:"",
    description:"",
    price:"",
    category:"",
    image:""
  })
  const [category,Setcategory]=useState({
    name:'',
    image:''
  })
  
  return (
    <div>
      {editpopup ?<EditPopup url={url} editpopup={editpopup} setEditpopup={setEditpopup} food={food} SetFood={SetFood} />:<></>}
      {categoryeditpopup ?<CategoryPopUp  url={url} categoryeditpopup={categoryeditpopup} categorysetEditpopup={categorysetEditpopup} category={category} Setcategory={Setcategory} />:<></>}
      <ToastContainer />
      <Navbar />
      
  
      <div className="app-content">
        <Sidebar />
        <Routes>
        <Route path="/" element={<Add url={url}/>} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url} editpopup={editpopup}  setEditpopup={setEditpopup} food={food} SetFood={SetFood} />} />
          <Route path="/order" element={<Order url={url}/>} />
          <Route path="/addcategory" element={<AddCategory url={url}/>} />
          <Route path="/listcategory" element={<ListCategory url={url} categoryeditpopup={categoryeditpopup} categorysetEditpopup={categorysetEditpopup} category={category} Setcategory={Setcategory} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
