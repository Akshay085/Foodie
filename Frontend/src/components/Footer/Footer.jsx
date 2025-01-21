import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            corrupti veniam quibusdam voluptatibus quo atque id impedit sint,
            dolore, doloribus facilis magni nesciunt, dignissimos corporis
            harum. Nihil aliquid minima exercitationem.
          </p>
          <div className="footer-social-icons">
            <img src="/Images/facebook.png" alt="Facebook icon" />
            <img src="/Images/instagram.png" alt="instagram icon" />
            <img src="/Images/linkedin.png" alt="linkedin icon" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANNY</h2>
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
            <li>+91 82003 41437</li>
            <li>contect@foodies.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copy">
        Copyright 2025 &copy; Foodies.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
