import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";
import SelfService from "./components/Self-service/SelfService";
import Homedelivery from "./components/Homedelivery/Homedelivery";

import './App.css'
import Search from "./pages/Search/Search";
import ProfileMain from "./pages/ProfileMain/ProfileMain";
import UserProfile from "./components/UserProfile/UserProfile";
import LogOut from "./components/LogOut/LogOut";
import OrderPage from "./components/OrderPage/OrderPage";
import { StoreContext } from "./Context/StoreContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ConfirmPassword from "./components/ConfirmPassword/ConfirmPassword";
import EditProfile from "./components/EditProfile/EditProfile";
import Verify from "./pages/Verify/Verify";



const App = () => {
  const [showlogin,SetShowlogin]=useState(false);
  const [forget,SetForget]=useState(false);
  const [Otpvarification,SetOtpvarification] = useState(false);
  const {token,setToken}=useContext(StoreContext);
   const [email,setEmail]=useState("")
   const [confirmPopUP,SetconfirmPopUP]=useState();
  
  return (
    <> 
    <ToastContainer />
      <div className="app" style={{position:"relative"}}>
    {showlogin ? <LoginPopUp  SetShowlogin={SetShowlogin} forget={forget} SetForget={SetForget}/> : null}

       {forget ?<ForgetPassword forget={forget} SetForget={SetForget} email={email} setEmail={setEmail} SetShowlogin={SetShowlogin} Otpvarification={Otpvarification} SetOtpvarification={SetOtpvarification} SetconfirmPopUP={SetconfirmPopUP}/>: null} 
        {/* {OtpPopup ? <OtpVarification  OtpPopup={OtpPopup} SetOtpPopup={SetOtpPopup} SetForget={SetForget}  />: null} */}
       {confirmPopUP ?<ConfirmPassword email={email} SetconfirmPopUP={SetconfirmPopUP}  SetOtpvarification={SetOtpvarification}/>:null}


        <Navbar SetShowlogin={SetShowlogin} />
        
        <div className="app-body">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart/self-service" element={<SelfService />} />
          <Route path="/cart/home-delivery" element={<Homedelivery />} />
          <Route path="/Placeorder" element={<Placeorder />} />
          <Route path="/verify" element={<Verify />}></Route>
          {token ?
           <Route path="/userprofile" element={<ProfileMain />}>
           <Route index element={<UserProfile />} /> 
           <Route path="profile" element={<UserProfile />} />
           <Route path="editprofile" element={<EditProfile />} />
           <Route path="orders" element={<OrderPage />} />
           <Route path="logout" element={<LogOut token={token} setToken={setToken} />} />
         </Route>
            
            : <></>}
        </Routes>
      </div>
      </div>
      <div className="footer">
       <Footer />
       </div>
     
      
      
    </>
  );
};

export default App;
