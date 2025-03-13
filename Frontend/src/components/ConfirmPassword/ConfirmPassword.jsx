import { useState } from 'react'
import React  from 'react'
import axios from 'axios';
import './ConfirmPassword.css'
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from 'react-toastify';
import { LoaderIcon, toast } from "react-hot-toast";

const ConfirmPassword = ({email,SetconfirmPopUP,SetOtpvarification}) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading,setLoading]=useState(false);
    const url = import.meta.env.VITE_BACKEND_BASEURL;
   //   console.log(email);

    const handleConfirm = async() => {
      setLoading(true);
        try{
            if (!newPassword || !confirmPassword) {
                toast("Please fill in both fields."); 
              }
              if (newPassword !== confirmPassword) {
                toast("Passwords do not match!"); 
              }
              else{
               const response = await axios.post(`${url}/api/user/updatePassword`, {email ,newPassword});
               if (response.data.success) {
                toast.success("Password is Changed Successfully");
               SetOtpvarification(false);
               SetconfirmPopUP(false);
               }
               else{
               toast("please try again") 
           }
          }
        }
       catch(error){
        //console.error("Error changing password:", error); 
      toast("Failed to change password. Please try again.");
       } 
       setLoading(false) 
    };
  
    return (
      <div className="popup-container">
        <div className="popup-box">
          <h2>Confirm Password</h2>
          
          
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="popup-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="popup-input"
          />
          <button onClick={handleConfirm} className="popup-button">
            {loading?<LoaderIcon />:"Confirm"}
          </button>
          <span className="close-btn" onClick={() => SetconfirmPopUP(false)}>
            &times;
          </span>
        </div>
      </div>
    );
  };


export default ConfirmPassword