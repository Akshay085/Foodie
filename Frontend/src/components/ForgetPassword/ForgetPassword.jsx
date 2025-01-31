import React, { useState } from 'react'
import axios from 'axios';
import './ForgetPassword.css'


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
            alert("Okk..");
            SetOtpvarification(true);
        }
        else{
           alert("soory..") 
        }
       }catch{
        console.error("Error sending OTP:", error);
      alert("Error: Please sign up first.");
       }
    }
    const  OnVarify=async()=>{ 
       
      try{
      const response = await axios.post(`${url}/api/user/verifyOtp`, {email , otp:OTP});
      if (response.data.success) {
          setOTP("");
          alert("Okk..");
          console.log(email);
          SetForget(false);
          SetOtpvarification(false);
          SetconfirmPopUP(true);
        
      }
      else{
         alert("soory.. OTP is Not Valid") 
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