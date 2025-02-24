import React from "react";
import "./footer.css";

const Footer = () => {
  const redirectToGmail=()=>{
    window.location.href = "mailto:foodies.0905@gmail.com";
  }
  const redirectToContect=()=>{
    window.location.href = "tel:+918200341437";
  }
  return (
    <div className="footer-container" id="footer">
        

       <div className="footer" >
        <div className="footer-content">
          <div className="footer-content-left">
            <p>
            Enjoy delicious meals delivered to your doorstep with Foodies – fast, fresh, and convenient! 🍽️🚀
            Order your favorite dishes anytime and experience hassle-free online food delivery.
            </p>
            {/* <div className="footer-social-icons">
              <img src="/Images/facebook.png" alt="Facebook icon" />
              <img src="/Images/instagram.png" alt="Instagram icon" />
              <img src="/Images/linkedin.png" alt="LinkedIn icon" />
            </div> */}
          </div>

          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li onClick={redirectToContect}>+91 82003 41437</li>
              <li onClick={redirectToGmail}>foodies.0905@gmail</li>
            </ul>
          </div>
        </div>

        <hr />
        <p className="footer-copy">
          Copyright 2025 &copy; Foodies.com - All Rights Reserved.
        </p>
      </div> 
    </div>
  );
};

export default Footer;
