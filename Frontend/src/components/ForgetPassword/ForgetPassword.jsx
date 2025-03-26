import React, { useState } from "react";
import axios from "axios";
import "./ForgetPassword.css";
import { LoaderIcon, toast } from "react-hot-toast";

const ForgetPassword = ({
  email,
  setEmail,
  forget,
  SetForget,
  SetOtpPopup,
  Otpvarification,
  SetOtpvarification,
  SetconfirmPopUP,
}) => {
  const [OTP, setOTP] = useState("");
    const [loading,setLoading]=useState(false);
  const url = import.meta.env.VITE_BACKEND_BASEURL;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "OTP") {
      setOTP(value);
    }
  };

  const OnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/sendOtp`, { email });
      if (response.data.success) {
       // console.log("Email submitted:", email);
        toast("Okk..");
        SetOtpvarification(true);
      } else {
        toast("Error: Please sign up first.");
      }
    } catch (error) {
        // alert(error)
      // toast(error);
      toast("Error:please try again ");
    }
    setLoading(false);
  };

  const OnVarify = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/verifyOtp`, {
        email,
        otp: OTP,
      });
      if (response.data.success) {
        setOTP("");
        toast("Verify Successfully");
       // console.log(email);
        SetForget(false);
        SetOtpvarification(false);
        SetconfirmPopUP(true);
      } else {
        toast("soory.. OTP is Not Valid");
      }
    } catch {
      console.log("error");
    }
    setLoading(false);
  };

  return (
    <div className="ForgetPopUp">
      <div className="ForgetPopUp-container">
        <div className="login-popup-title">
          {Otpvarification ? <h2>Varify OTP</h2> : <h2>Forget Password</h2>}
          <img
            onClick={() => SetForget(false)}
            src="/Images/cross_icon.png"
            alt="Close"
          />
        </div>
        <form onSubmit={OnSubmit}>
          {" "}
          {/* Wrap in form and add onSubmit */}
          {Otpvarification ? null : (
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              className="card-input"
              required
            />
          )}
          {Otpvarification ? (
            <input
              type="text"
              placeholder="Enter OTP"
              name="OTP"
              value={OTP}
              onChange={handleChange}
              className="card-input"
            />
          ) : (
            <button type="submit" className="card-button">
            {loading?<div style={{display:'flex',justifyContent:'center'}}><LoaderIcon /></div>:"Send OTP"}
            </button>
          )}
        </form>
        {Otpvarification && (
          <button className="card-button" onClick={OnVarify}>
         {loading?<div style={{display:'flex',justifyContent:'center'}}><LoaderIcon /></div>:"Varify OTP"}    
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
