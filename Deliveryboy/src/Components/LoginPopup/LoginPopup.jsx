import React, { useState, useEffect, useContext } from "react";
import "./LoginPopup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContextdel";
import {  useNavigate} from 'react-router-dom'
const LoginPopup = () => {
  const { url,token, setToken, } = useContext(StoreContext);
     const navigate=useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
    
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
   console.log(data);
   
    try {
      const response = await axios.post(`${url}/api/delBoy/login`, data);
      console.log("Login Response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(data));

        toast.success("Welcome!");
        SetShowlogin(false);
        setUserData(response.data);
        console.log("My Response:", response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };



  useEffect(() => {
    console.log("Current Data:", data);
  }, [data]);

  const forgetPopup = () => {
    SetShowlogin(false);
    SetForget(true);
  };

  return (
    <div className="LoginPopUp">
        <div className="login-left">
      <form
        method="post"
        onSubmit={ onLogin}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>Login</h2>
          
        </div>
        <div className="login-popup-input">
        
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
        </div>

        <div className="forget-link-container">
           <span > Forget Password ?</span>
        </div>

        <button type="submit">
           Login
        </button>
        
      </form>
      </div>
   
    </div>
  );
};

export default LoginPopup;
