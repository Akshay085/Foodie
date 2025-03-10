import React ,{useState}  from 'react'

import { useNavigate } from "react-router-dom";
import './LogOut.css'
import FeedBack from '../Feedback/FeedBack';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
const LogOut = ({token,setToken}) => {
  // const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");    
    setToken("");
    navigate("/"); 
    window.location.reload();
  };
  return (
  
    <div className="logout-container">
    
    <h2>Are you sure you want to log out?</h2>
    <div className="logout-buttons">
      <button onClick={logout} className="logout-btn">Yes, Logout</button>
      <button  className="cancel-btn">Cancel</button>
    
    </div>
    {/* <FeedBack /> */}
    {/* <Box display="flex" gap={2} justifyContent="center">
      {otp.map((digit, index) => (
        <TextField
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={digit}
          // onChange={(e) => handleChange(index, e)}
          inputProps={{
            maxLength: 1, // Limit to one character
            style: { textAlign: 'center' }, // Center the text
          }}
          variant="outlined"
          sx={{
            width: '50px', // Fixed width for each box
            '& input': {
              fontSize: '1.5rem', // Larger font size for better visibility
            },
          }}
        />
      ))}
    </Box> */}
  </div>
  )
}

export default LogOut