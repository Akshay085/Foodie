import React,{useState} from 'react'
import './ForgetPassword.css'
import axios from 'axios';
const ForgetPassword = ({ url, onClose }) => {
    const [email, setEmail] = useState("");
  
    const handleChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleResetPassword = async (e) => {
      e.preventDefault();
  
      if (!email) {
        toast.error("Please enter your email.");
        return;
      }
  
      try {
        const response = await axios.post(url + "/api/admin/forgotpassword", { email });
  
        if (response.data.success) {
          toast.success("Reset link sent! Check your email.");
          onClose();
        } else {
          toast.error(response.data.message || "Something went wrong.");
        }
      } catch (error) {
        toast.error("Failed to send reset link.");
      }
    };
  
    return (
      <div className="forget-password-popup">
        <div className="popup-content">
          <h2>Reset Password</h2>
          <p>Enter your email to receive a reset link.</p>
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>
      </div>
    );
  };
  

export default ForgetPassword