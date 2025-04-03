import React, { useContext, useEffect, useState } from "react";
import "./LoginPopUp.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"
//import { Link, Links } from "react-router-dom";
import { toast,LoaderIcon } from "react-hot-toast";
// import { toast } from "react-toastify";
// import'react-toastify/dist/ReactToastify.css';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Loader from "../MyLottieAnimation/Loader";

const LoginPopUp = ({ SetShowlogin,forget , SetForget }) => {
  const { url, setToken,userData,setUserData } = useContext(StoreContext);
  const [loading,setLoading]=useState(false);
  const [currentState, SetCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };


  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/login`, data);

      //console.log("Login Response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.userData));
        
        
        toast("Welcome!");
        
        SetShowlogin(false);
        //console.log("My Response:", response.data);
        setUserData(response.data);
        //console.log(userData);

      } else {
        alert("response.data.message")
        toast(response.data.message);
      }
    }
     catch (error) {
      //console.log("Login error:", error);
      alert("Invalid Credential");
      toast("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const onRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/register`, data);

    //  console.log("Register Response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast("Registration successful. Please log in.");
        SetCurrentState("Login"); 
        setData({ email: "", password: "" });
      } else {
        alert(response.data.message);
        toast(response.data.message);
      }
    } catch (error) {
      alert("This Email Is already Used");
      toast("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    //console.log("Current Data:", data);
  }, [data]);


  
  const forgetPopup=()=>{
    SetShowlogin(false)
    SetForget(true)
  }

  return (
    <div className="LoginPopUp">
      <form
        method="post"
        onSubmit={currentState === "Sign Up" ? onRegister : onLogin}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          
          <CloseTwoToneIcon 
  onClick={() => SetShowlogin(false)}
  style={{ 
    cursor: "pointer",
    color: "#000", // Customize color (optional)
    fontSize: "24px" // Adjust size (optional)
  }}
  />
        </div>
        <div className="login-popup-input">
          {currentState === "Sign Up" && (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                name="contact"
                onChange={onChangeHandler}
                value={data.contact}
                type="number"
                placeholder="Mobile Number"
                required
              />
            </>
          )}
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
            placeholder="Password (8 digit)"
            required
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p> 
        </div>

       <div className="forget-link-container">
       {currentState==='Login'?<span onClick={forgetPopup}> Forget Password ?</span>:null}
       </div>

        <button type="submit">
          {loading?<div style={{display:"flex" ,justifyContent:"center"}}><LoaderIcon /></div>:<>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
          </>}
        </button>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => SetCurrentState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => SetCurrentState("Login") }>Login Here</span>
          </p>
        )}
      </form>
    
    </div>
  );
};

export default LoginPopUp;
