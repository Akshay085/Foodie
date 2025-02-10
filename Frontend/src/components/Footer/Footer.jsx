import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{width: "100%",height: "auto"}}>
  <path fill="#FF6347" fillOpacity="1" d="M0,160L48,138.7C96,117,192,75,288,64C384,53,480,75,576,101.3C672,128,768,160,864,154.7C960,149,1056,107,1152,106.7C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
</svg>

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
              <img src="/Images/instagram.png" alt="Instagram icon" />
              <img src="/Images/linkedin.png" alt="LinkedIn icon" />
            </div>
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
              <li>+91 82003 41437</li>
              <li>contact@foodies.com</li>
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
