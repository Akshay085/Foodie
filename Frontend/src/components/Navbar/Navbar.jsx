import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import MyLottieAnimation from "../MyLottieAnimation/MyLottieAnimation";

const Navbar = ({ SetShowlogin }) => {
  const [menu, Setmenu] = useState("Home");
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Function to handle manual click and update active state
  const handleMenuClick = (menuItem) => {
    Setmenu(menuItem);
  };

  useEffect(() => {
    const sections = [
      { id: "home", value: "Home" },
      { id: "fooddisplay", value: "Menu" },
      { id: "footer", value: "Contact us" },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of the viewport
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedSection = sections.find((sec) => sec.id === entry.target.id);
          if (matchedSection) {
            Setmenu(matchedSection.value);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <MyLottieAnimation />
      </Link>
      <ul className="navbar-menu">
        <a
          href="#home"
          onClick={() => handleMenuClick("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </a>
        <a
          href="#fooddisplay"
          onClick={() => handleMenuClick("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => handleMenuClick("Contact us")}
          className={menu === "Contact us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <Link to="./search">
          <img src="\Images\search_icon.png" alt="searchicon" />
        </Link>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src="\Images\basket_icon.png" alt="basketicon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div className="login-button">
          {!token ? (
            <button onClick={() => SetShowlogin(true)}>Sign In</button>
          ) : (
            <div className="Navbar-profile">
              <Link to="/userprofile">
                <img src="\Images\profile_icon.png" alt="profile icon" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
