import React from 'react'
import './Privacypolicy.css'
import MyLottieAnimation from '../MyLottieAnimation/MyLottieAnimation';
const Privacypolicy = () => {
    return (
        <div className="privacy-policy-container">
          <h1>Privacy Policy</h1>
          <p>
            Welcome to ,<MyLottieAnimation />. We are committed to protecting your privacy.
            This Privacy Policy outlines how we collect, use, and safeguard your personal information.
          </p>
    
          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> When you create an account or place an order, we collect information such as your name, email address, phone number, and delivery address.
            </li>
            <li>
              <strong>Payment Information:</strong> We collect payment details necessary to process your orders, which may include credit card information or other payment method details. (Note: Ensure compliance with PCI DSS standards if you store payment information).
            </li>
            <li>
              <strong>Order History:</strong> We keep records of your past orders to improve your experience and provide customer support.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you interact with our platform, including your IP address, browser type, and device information.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your browsing experience and analyze usage patterns.
            </li>
          </ul>
    
          <h2>How We Use Your Information</h2>
          <ul>
            <li>
              To process and fulfill your orders.
            </li>
            <li>
              To communicate with you about your orders and provide customer support.
            </li>
            <li>
              To personalize your experience and provide tailored recommendations.
            </li>
            <li>
              To improve our services and develop new features.
            </li>
            <li>
              To send you promotional offers and marketing communications (you can opt out at any time).
            </li>
            <li>
              To comply with legal obligations.
            </li>
          </ul>
    
          <h2>Sharing Your Information</h2>
          <ul>
            <li>
              We may share your information with third-party service providers who assist us in operating our platform, processing payments, and delivering orders.
            </li>
            <li>
              We may share your information with restaurants or delivery partners to fulfill your orders.
            </li>
            <li>
              We may disclose your information if required by law or to protect our rights.
            </li>
            <li>
              We will not sell your personal information to third parties.
            </li>
          </ul>
    
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access,
            disclosure, alteration, and destruction.
          </p>
    
          <h2>Your Rights</h2>
          <ul>
            <li>
              You have the right to access, correct, or delete your personal information.
            </li>
            <li>
              You can opt out of receiving marketing communications.
            </li>
            <li>
              You can manage your cookie preferences.
            </li>
          </ul>
    
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website.
          </p>
    
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at [Your Contact Information].
          </p>
        </div>
      );
}

export default Privacypolicy