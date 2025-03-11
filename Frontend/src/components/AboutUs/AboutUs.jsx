import React from 'react'
import './AboutUs.css'
import MyLottieAnimation from '../MyLottieAnimation/MyLottieAnimation';

const AboutUs = () => {
    const redirectToContect=()=>{
        window.location.href = "tel:+918200341437";
      }
    return (
        <div className="about-us-container">
          <section className="about-us-hero">
            
            <div className="hero-content">
                {/* <MyLottieAnimation /> */}
              <h1>Welcome to Our Food Ordering System</h1>
              <p>We're passionate about delivering delicious food right to your doorstep.</p>
            </div>
          </section>
    
          <section className="about-us-section">
            <div className="section-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2025, our journey began with a simple idea: to make food ordering convenient and enjoyable. We believe that everyone deserves access to great food, no matter where they are.
              </p>
              <p>
              We craft a wide variety of cuisines and flavors from our own kitchens, ensuring every order is delivered quickly and accurately by our dedicated team.
              </p>
            </div>
          </section>
    
          <section className="about-us-section">
            <div className="section-content">
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide a seamless and satisfying food ordering experience. We strive to:
              </p>
              <ul>
                <li>Offer a diverse selection of high-quality food.</li>
                <li>Provide fast and reliable delivery services.</li>
                <li>Ensure excellent customer support.</li>
                
              </ul>
            </div>
          </section>
    
          <section className="about-us-section">
            <div className="section-content">
              <h2>Why Choose Us?</h2>
              <p>
                We're committed to making your food ordering experience exceptional. Here's what sets us apart:
              </p>
              <ul>
                <li>Easy-to-use platform.</li>
               
                <li>Secure and convenient payment methods.</li>
               
                <li>Dedicated customer support team.</li>
              </ul>
            </div>
          </section>
    
          <section className="about-us-section contact-section">
            <div className="section-content">
              <h2>Contact Us</h2>
              <p>
                Have any questions or feedback? We'd love to hear from you!
              </p>
              <p>
                Email: <a href="mailto:foodies.0905@gmail">foodies.0905@gmail</a>
                <br />
                <p onClick={redirectToContect}>Phone : 8200341437 </p>
              </p>
            </div>
          </section>
    
          <footer className="about-us-footer">
            <p>&copy; {new Date().getFullYear()} Your Food Ordering System. All rights reserved.</p>
          </footer>
        </div>
      );
}

export default AboutUs