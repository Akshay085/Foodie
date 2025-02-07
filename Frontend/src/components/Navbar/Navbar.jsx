import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import MyLottieAnimation from "../MyLottieAnimation/MyLottieAnimation";

const Navbar = ({ SetShowlogin }) => {
  const [menu, Setmenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  

  return (
    <div className="navbar">
      <Link to="/">
      <MyLottieAnimation />
        {/* <img src="\Images\logof.png" className="logo" alt="brandlogo" /> */}
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => Setmenu("Home")}
          className={menu === "Home" ? "active" : " "}
        >
          Home
        </Link>
        <a
          href="#fooddisplay"
          onClick={() => Setmenu("Menu")}
          className={menu === "Menu" ? "active" : " "}
        >
          Menu
        </a>
        {/*<li onClick={()=>Setmenu("Mobile-App")}className={menu==='Mobile-App' ? "active": " "}>Mobile-App</li>*/}
        <a
          href="#footer"
          onClick={() => Setmenu("Contact us")}
          className={menu === "Contact us" ? "active" : " "}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <Link to="./search"><img src="\Images\search_icon.png" alt="searchicon" /></Link>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src="\Images\basket_icon.png" alt="basketicon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div className="login-button">
          {!token ? 
            <button onClick={() => SetShowlogin(true)}>Sign In</button>
           : 
            <div className="Navbar-profile">
             <Link to="/userprofile"> <img src="\Images\profile_icon.png" alt="profile icon" /></Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
