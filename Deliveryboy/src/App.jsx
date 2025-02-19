import React from 'react'
import { ToastContainer } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import { Route, Routes } from 'react-router-dom';
import Orders from './Components/Orders/Orders';

const App = () => {
  return (
   <div>
    <ToastContainer />
    <Routes >
    <Route path='/' element={<LoginPopup />} />
      <Route path='/login' element={<LoginPopup />} />
      <Route  path='/orders'element={<Orders />} ></Route>
    </Routes>
   </div>
  )
}

export default App