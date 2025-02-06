import React, { useState } from 'react'
import axios from 'axios';
import './ForgetPassword.css'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = ({email,setEmail,forget,SetForget,SetOtpPopup,Otpvarification ,SetOtpvarification,SetconfirmPopUP}) => {
  
  
 const [OTP,setOTP]=useState();
    const url = "http://localhost:4000";
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === "email") {
        setEmail(value);
      } else if (name === "OTP") {
        setOTP(value);
      }
      };

    const  OnSubmit=async()=>{       
      try{
         const response = await axios.post(`${url}/api/user/sendOtp`, {email});
        if (response.data.success) {
          console.log("Email submitted:", email);
            toast.success("Okk..");
            SetOtpvarification(true);
        }
        else{
          // {<p>Error: Please sign up first.</p>}
          toast.error("Error: Please sign up first.");
           
        }
       }catch{
        console.log("Error In sending OTP:");
        toast.error("Error: Please sign up first.");
       }
    }
    const  OnVarify=async()=>{ 
       
      try{
      const response = await axios.post(`${url}/api/user/verifyOtp`, {email , otp:OTP});
      if (response.data.success) {
          setOTP("");
         toast.success("Okkk");
          console.log(email);
          SetForget(false);
          SetOtpvarification(false);
          SetconfirmPopUP(true);
        
      }
      else{
         toast.error("soory.. OTP is Not Valid") 
      }

     }catch{
      console.log("error");
     }
  }
  return (
    <div className='ForgetPopUp'>
        <div className="ForgetPopUp-container">
        <div className="login-popup-title">
          {Otpvarification?<h2>Varify OTP</h2>:<h2>Forget Password</h2>}
          <img
            onClick={() => SetForget(false)}
            src="/Images/cross_icon.png"
            alt="Close"
          />
        </div> 

      {Otpvarification?null:<input
        type="email"
        placeholder="Enter your email"
        name='email'
        value={email}
        onChange={handleChange}
        className="card-input"
        required 
      />}
      {Otpvarification? <input type='number' placeholder='Enter OTP' name='OTP'
        value={OTP}
        onChange={handleChange}
        className="card-input"/>:""}
      {Otpvarification?<button  className="card-button" onClick={OnVarify}>
      Varify OTP
      </button>:<button  className="card-button" onClick={OnSubmit}>
        Send OTP
      </button>
      }
        </div>
    </div>
  )
}

export default ForgetPassword