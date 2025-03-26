import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const Verify = () => {
    const {url,userData}=useContext(StoreContext);
    const navigate=useNavigate();
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
      const user = JSON.parse(localStorage.getItem("user"));
      const userid=user._id;
    //  console.log(userid);
      
    
    // console.log(success,orderid);
    
    const  verifyPayment=async()=>{
           const response=await axios.post(url+"/api/order/verify",{success,orderId ,userid});
           if(response.data.success){
                navigate("/userprofile/orders")
           }
           else{
            navigate("/")
           }
    }
    useEffect(()=>{
        verifyPayment();
        window.scrollTo(0,0);
    },[])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify