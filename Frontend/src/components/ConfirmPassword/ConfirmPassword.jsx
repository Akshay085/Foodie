import { useState } from 'react'
import React  from 'react'
import axios from 'axios';
import './ConfirmPassword.css'
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const ConfirmPassword = ({email,SetconfirmPopUP,SetOtpvarification}) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const url = "http://localhost:4000";
      console.log(email);

    const handleConfirm = async() => {
      
        try{
            if (!newPassword || !confirmPassword) {
                toast.warn("Please fill in both fields."); 
              }
              if (newPassword !== confirmPassword) {
                toast.warn("Passwords do not match!"); 
              }
              else{
               const response = await axios.post(`${url}/api/user/updatePassword`, {email ,newPassword});
               if (response.data.success) {
                toast.success("Password is Changed Successfully");
               SetOtpvarification(false);
               SetconfirmPopUP(false);
               }
               else{
               toast.error("sorry..") 
           }
          }
        }
       catch(error){
        console.error("Error changing password:", error); 
      toast.error("Failed to change password. Please try again.");
       }  
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
            Confirm
          </button>
          <span className="close-btn" onClick={() => SetconfirmPopUP(false)}>
            &times;
          </span>
        </div>
      </div>
    );
  };


export default ConfirmPassword