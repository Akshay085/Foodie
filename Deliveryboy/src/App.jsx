import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import  { Toaster} from 'react-hot-toast'
import { toast } from 'react-hot-toast'

import LoginPopup from './Components/LoginPopup/LoginPopup';
import { Route, Routes } from 'react-router-dom';
import Orders from './Components/Orders/Orders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ConfirmPassword from './Components/ConfirmPassword/ConfirmPassword';

const App = () => {
   const [email, SetEmail] = useState();
  const [loginPopUp, SetloginPopUp] = useState(true);
  const [forgetPopUp, SetforgetPopUp] = useState(false);
  const [confirmPopUP,SetconfirmPopUP]=useState();
  const [Otpvarification,SetOtpvarification] = useState(false);

  return (
    <div>
      <Toaster 
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <ToastContainer />

      {confirmPopUP ?<ConfirmPassword email={email}  SetloginPopUp={SetloginPopUp} SetconfirmPopUP={SetconfirmPopUP}  SetOtpvarification={SetOtpvarification}/>:null}

      {forgetPopUp ? (
        <ForgetPassword
        email={email}
        SetEmail={SetEmail}
          loginPopUp={loginPopUp}
          SetloginPopUp={SetloginPopUp}
          forgetPopUp={forgetPopUp}
          SetforgetPopUp={SetforgetPopUp}
          Otpvarification={Otpvarification}
          SetOtpvarification={SetOtpvarification}
          SetconfirmPopUP={SetconfirmPopUP}
        />
      ) : loginPopUp ? (
        <LoginPopup
          loginPopUp={loginPopUp}
          SetloginPopUp={SetloginPopUp}
          forgetPopUp={forgetPopUp}
          SetforgetPopUp={SetforgetPopUp}
        />
      ) : null}

      <Routes>
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
