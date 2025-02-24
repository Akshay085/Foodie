import React, { useState } from 'react';
import './LoginPopUp.css';
// import {  ToastContainer,toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import { Toaster ,toast} from 'react-hot-toast';

const LoginPopUp = ({ url,onLoginSuccess }) => {
    const navigate=useNavigate();
    const [showForgetPopup, setShowForgetPopup] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onLogin = async (e) => {
        e.preventDefault();
        console.log(data);
      
        try {
          const response = await axios.post(url + "/api/admin/login", data);
      
          if (response.data.success) {
            toast.success("Welcome"); 
            onLoginSuccess();
          } else {
            toast.error("Invalid Credentials");
          }
        } catch (err) {
          console.error("Login Error:", err.response?.data || err.message);
      
          let errorMessage = "An error occurred. Try again.";
          if (err.response) {
            errorMessage = err.response.data.message || "Invalid Data";
          } else if (err.request) {
            errorMessage = "No response from server. Check your connection.";
          }
          toast.error(errorMessage);
        }
      };
      
    return (
        <div className='LoginPopUp-admin'>
           
            <div className='header-title'>Login</div>
            <div className='content'>
                <form onSubmit={onLogin}>
                    <input type="email" name='email' value={data.email} onChange={handleChange} placeholder="Enter your email" required />
                    <input type="password" name='password' value={data.password} onChange={handleChange} placeholder="Enter your password" required />
                    <div className='checkbox-content'>
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
                    </div>
                    {/*<span className='forget-password-admin' onClick={() => setShowForgetPopup(true)}>Forget Password ?</span>
                     {showForgetPopup && <ForgetPassword url={url} onClose={() => setShowForgetPopup(false)} />} */}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPopUp;
