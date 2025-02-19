import React, { useState } from 'react'
import axios from 'axios'
import "./AddDeliveryBoy.css"
import { toast ,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddDeliveryBoy = ({url}) => {
    const [input,setInput]=useState({
        name:"",
        contact:"",
        email:"",
        password:"",
        address:"",
        city:"",
        country:"",
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setInput((prev) =>({...prev,[name]:value}));
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        console.log(input);
        const formData=new FormData();
        formData.append("name", input.name);
        formData.append("contact",input.contact );
        formData.append("email", input.email);
        formData.append("password",input.password);
        formData.append("address",input.address);
        formData.append("city",input.city);
        formData.append("country",input.country);
    const response = await axios.post(`${url}/api/delBoy/register`, input);
        if (response.data.success) {
            toast.success(response.data.message);
            setInput({
                name:"",
                contact:"",
                email:"",
                password:"",
                address:"",
                city:"",
                country:"",
            });
            
          } else {
            toast.error(response.data.message);
          }
    }
  return (
    <div className='AddDeliveryBoy-main'>
       <form onSubmit={onSubmit} >
        <label htmlFor="full name">Name:</label>
        <input type="text" name='name' value={input.name}  onChange={handleChange} />
        <label htmlFor="mobileno">Contact No:</label>
        <input type="number" name='contact' value={input.contact} onChange={handleChange}  />
        <label htmlFor="email">Email:</label>
        <input type="email" name='email' value={input.email} onChange={handleChange}  />
        <label htmlFor="password">Password</label>
        <input type="text" name='password' value={input.password} onChange={handleChange}/>
        <label htmlFor="address">Address:</label>
        <textarea name="address"   value={input.address}  onChange={handleChange} ></textarea>
        <label htmlFor="city">City:</label>
        <input type="text" name='city' value={input.city} onChange={handleChange}  />
        <label htmlFor="country">Country:</label>
        <input type="text" name='country' value={input.country} onChange={handleChange}  />

        <button type='submit'>Add</button>
       </form>
    </div>
  )
}

export default AddDeliveryBoy