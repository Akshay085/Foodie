import React, { useState, useEffect, useContext } from "react";
import "./LoginPopup.css";
import axios from "axios";
import { LoaderIcon, toast } from "react-hot-toast";
import { StoreContext } from "../../context/StoreContextdel";
import {  useNavigate} from 'react-router-dom'
import Loader from "../Animation/Loader";
const LoginPopup = ({loginPopUp, SetloginPopUp ,forgetPopUp,SetforgetPopUp}) => {
  const url=import.meta.env.VITE_BACKEND_BASEURL;
  const { token, setToken, } = useContext(StoreContext);
    const [loading,setLoading]=useState(false);
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
    setLoading(true);
   //console.log(data);
   
    try {
      const response = await axios.post(`${url}/api/delBoy/login`, data);
      console.log("Login Response:", response.data.delBoyData);

      if (response.data.success) {
        // setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Welcome!");
        console.log("My Response:", response.data.delBoyData);
        localStorage.setItem("delboydata",JSON.stringify(response.data.delBoyData))
        SetloginPopUp(false);
        navigate("/orders"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };



  useEffect(() => {
     //SetloginPopUp(false);
    console.log("Current Data:", data);
  }, [data]);

  const forgetPassword = () => {
    SetforgetPopUp(true);
    SetloginPopUp(false);
};

  // const forgetPopup = () => {
  //   SetShowlogin(false);
  //   SetForget(true);
  // };

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

        <div className="forget-link-container" onClick={forgetPassword}>
           <span  > Forget Password ?</span>
        </div>
        <button type="submit">
         {loading==true?<div style={{display: "flex", alignItems: "center", justifyContent: "center" ,border:"none",outline:"none"}}><LoaderIcon /></div>:"Login"}  
        </button>
        
      </form>
      </div>
   
    </div>
  );
};

export default LoginPopup;
