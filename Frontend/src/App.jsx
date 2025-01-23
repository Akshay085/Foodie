import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";
import SelfService from "./components/Self-service/SelfService";
import Homedelivery from "./components/Homedelivery/Homedelivery";
import './App.css'

const App = () => {
  const [showlogin,SetShowlogin]=useState(false);
  return (
    <>
    {showlogin ? <LoginPopUp  SetShowlogin={SetShowlogin}/> : <></>}
      <div className="app">
      
        <Navbar SetShowlogin={SetShowlogin}/>
        
        <div className="app-body">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/self-service" element={<SelfService />} />
          <Route path="/cart/home-delivery" element={<Homedelivery />} />
          <Route path="/Placeorder" element={<Placeorder />} />
        </Routes>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
