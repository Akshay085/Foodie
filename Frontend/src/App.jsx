import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";

const App = () => {
  const [showlogin,SetShowlogin]=useState(false);
  return (
    <>
    {showlogin ? <LoginPopUp  SetShowlogin={SetShowlogin}/> : <></>}
      <div className="app">
        <Navbar SetShowlogin={SetShowlogin}/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Placeorder" element={<Placeorder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
