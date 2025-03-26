import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import MyLottieAnimation from "../MyLottieAnimation/MyLottieAnimation";

const Navbar = ({ SetShowlogin }) => {
  const [menu, Setmenu] = useState("Home");
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleMenuClick = (menuItem) => {
    Setmenu(menuItem);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const sections = [
      { id: "home", value: "Home" },
      { id: "fooddisplay", value: "Menu" },
      { id: "footer", value: "Contact us" },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -20% 0px",
      threshold: 0.2,
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedSection = sections.find(
            (sec) => sec.id === entry.target.id
          );
          if (matchedSection) {
            Setmenu(matchedSection.value);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const sections = document.querySelectorAll("section");

    //console.log("----", sections);

    const handleScroll = () => {
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 50) {
          currentSection = section.getAttribute("id");
        }
      });

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        currentSection = "footer";
      }

      if (currentSection === "exploremenu") {
        handleMenuClick("Menu");
      } else if (currentSection === "header") {
        handleMenuClick("Home");
      } else if (currentSection === "footer") {
        handleMenuClick("Contact us");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <MyLottieAnimation />
      </Link>
      {location?.pathname == "/cart" ||
      location?.pathname == "/cart/self-service" ||
      location?.pathname == "/cart/home-delivery" ||
      location?.pathname == "/Placeorder" ? null : (
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
            Contact
          </a>
        </ul>
      )}
      <div className="navbar-right">
        <Link to="./search">
          {/* <img src="\Images\search_icon.png" alt="searchicon" /> */}
          <SearchIcon
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          />
        </Link>
        <div className="navbar-search-icon">
          <Link to="/cart">
            {/* <img src="\Images\basket_icon.png" alt="basketicon" /> */}
            <ShoppingBagTwoToneIcon
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div className="login-button">
          {!token ? (
            <button onClick={() => SetShowlogin(true)}>Sign In</button>
          ) : (
            <div className="Navbar-profile">
              <Link to="/userprofile">
                <AccountCircleTwoToneIcon
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                  }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
