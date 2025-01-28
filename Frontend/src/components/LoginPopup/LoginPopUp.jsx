import React, { useContext, useEffect, useState } from "react";
import "./LoginPopUp.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"
const LoginPopUp = ({ SetShowlogin }) => {
  const {url,setToken}=useContext(StoreContext);
  const [currentState, SetCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    contact:"",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
    
  const onLogin=async (event) =>{
    event.preventDefault()
    let newUrl=url;
    if(currentState==="Login"){
      newUrl +="/api/user/login";
    }
   else{
    newUrl +="/api/user/register";
   }
   const response=await axios.post(newUrl,data);
   if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      SetShowlogin(false);
   }
   else{
    alert(response.data.message)
   }
  }
  
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="LoginPopUp">
      <form method="post" onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => SetShowlogin(false)}
            src="\Images\cross_icon.png"
            alt="X icon"
          />
        </div>
        <div className="login-popup-input">
          {currentState == "Login" ? (
            <></>
          ) : (<>
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
            placeholder="Password"
            required
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By , Continuing , i agree to the terms of use & privacy policy.</p>
        </div>
        <button type='submit'>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {currentState === "Login" ? (
          <p>
            Create A New Account{" "}
            <span onClick={() => SetCurrentState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already Have an account ?{" "}
            <span onClick={() => SetCurrentState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
