import React,{useContext, useState} from 'react'
import './ConfirmPassword.css'
import {useNavigate} from 'react-router-dom'
import { LoaderIcon, toast } from 'react-hot-toast'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContextdel';
import Loader from '../Animation/Loader';

const ConfirmPassword = ({email,SetloginPopUp,SetconfirmPopUP,SetOtpvarification}) =>  {
   const navigate = useNavigate();
    const [loading,setLoading]=useState(false);
    //  const { url } = useContext(StoreContext);
    const url=import.meta.env.VITE_BACKEND_BASEURL;
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
 console.log("----------------->",email);
  
const handleConfirm = async() => {
  setLoading(true);  
    try{
        if (!newPassword || !confirmPassword) {
            toast.warn("Please fill in both fields."); 
          }
          if (newPassword !== confirmPassword) {
            toast.warn("Passwords do not match!"); 
          }
          else{
           const response = await axios.post(`${url}/api/delBoy/updatePassword`, {email ,newPassword});
           if (response.data.success) {
            toast.success("Password is Changed Successfully");
           SetOtpvarification(false);
           SetconfirmPopUP(false);
           SetloginPopUp(true)
           }
           else{
           toast.error("sorry..") 
       }
      }
    }
   catch(error){
    console.log("Error changing password:", error); 
  toast.error("Failed to change password. Please try again.");
   }  
   setLoading(false);  
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
      {  loading ?<div style={{display: "flex", alignItems: "center", justifyContent: "center",border:"none"}}><LoaderIcon/></div>: "Confirm"}
      </button>
      <span className="close-btn" onClick={() => {SetconfirmPopUP(false),navigate("/login")}}>
        &times;
      </span>
    </div>
  </div>
);
};

export default ConfirmPassword