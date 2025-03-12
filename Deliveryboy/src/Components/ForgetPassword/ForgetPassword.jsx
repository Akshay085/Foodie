import React, { useContext, useState } from "react";
import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { StoreContext } from "../../context/StoreContextdel";
const ForgetPassword = ({
  email,
  SetEmail,
  loginPopUp,
  SetloginPopUp,
  SetforgetPopUp,
  Otpvarification,
  SetOtpvarification,
  SetconfirmPopUP,
}) => {
  // const { url } = useContext(StoreContext);
  //   const [email, SetEmail] = useState();
  const url=import.meta.env.VITE_BACKEND_BASEURL;
  const [OTP, setOTP] = useState();
  //   const [Otpvarification, SetOtpvarification] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      SetEmail(value);
    } else if (name === "OTP") {
      setOTP(value);
    }
  };

  const OnSubmit = async () => {
    try {
      const response = await axios.post(`${url}/api/delBoy/sendOtp`, { email });
      if (response.data.success) {
        console.log("Email submitted:", email);
        toast.success("Okk..");
        SetOtpvarification(true);
      } else {
        toast.error("Error: Please sign up first.");
      }
    } catch {
      console.log("Error In sending OTP:");
      toast.error("Error: Please sign up first.");
    }
  };

  const OnVarify = async () => {
    if (!email || !OTP) {
      toast.error("Email and OTP are required.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/delBoy/verifyOtp`, {
        email,
        otp: OTP,
      });

      if (response.data.success) {
        setOTP("");
        toast.success("OTP verified successfully!");
        console.log("Verified Email:", email);
        SetforgetPopUp(false);
        SetOtpvarification(false);
        SetconfirmPopUP(true);
      } else {
        toast.error("Sorry, OTP is not valid.");
      }
    } catch (error) {
      console.log(
        "Error verifying OTP:",
        error.response ? error.response.data : error
      );
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="ForgetPopUp">
      <div className="ForgetPopUp-container">
        <div className="login-popup-title">
          {Otpvarification ? <h2>Varify OTP</h2> : <h2>Forget Password</h2>}
          <img
            onClick={() => {
              SetforgetPopUp(false),
                SetloginPopUp(true),
                SetOtpvarification(false);
            }}
            src="/images/cross_icon.png"
            alt="Close"
          />
        </div>

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
            type="number"
            placeholder="Enter OTP"
            name="OTP"
            value={OTP}
            onChange={handleChange}
            className="card-input"
          />
        ) : (
          ""
        )}
        {Otpvarification ? (
          <button className="card-button" onClick={OnVarify}>
            Varify OTP
          </button>
        ) : (
          <button className="card-button" onClick={OnSubmit}>
            Send OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
