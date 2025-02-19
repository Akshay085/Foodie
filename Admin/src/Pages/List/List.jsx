import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios";
import {toast} from 'react-toastify'

const List = ({url,editpopup,setEditpopup,food,SetFood}) => {
  
  const [list,Setlist]=useState([]);
  const fetchList =async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    //console.log(response.data);
    if(response.data.success){
      Setlist(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  const removeFood=async(foodId)=>{
      const responce =await axios.post(`${url}/api/food/remove`,{id:foodId})
      await fetchList();
      if (responce.data.success) {
        toast.success(responce.data.message);
      }
      else{
        toast.error("Error");
      }
  }
 const handleEditPopup=async(fooddetails)=>{
    setEditpopup(!editpopup);
     SetFood(fooddetails);
  }
  return (
    <div className='listadd'>
      <center><p>All Food List</p></center>
      <div className="list-table">
        <div className="list-food-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Delete</b>
          <b>Edit</b>
        </div>

        {list.map((item,index)=>{
          return(
            <div key={index} className='list-food-table-format'>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <div className='edit-delete-images'>
              <img onClick={()=>removeFood(item._id)} className='delete-item' src="\Images\bin.png" alt="" /></div>
              <div className='edit-delete-images'>
              <img onClick={()=>handleEditPopup(item)} className='update-item' src="\Images\edit.png" alt="" /> 
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List