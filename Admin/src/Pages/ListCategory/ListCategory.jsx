import React from "react";
import "./ListCategory.css";
import { useState,useEffect} from 'react'
import axios from "axios";
import { toast } from 'react-hot-toast'
// import {toast} from 'react-toastify'

const ListCategory = ({url,category,Setcategory,categoryeditpopup,categorysetEditpopup}) => {

  const [list, Setlist] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/category/list`);
    //console.log(response.data);
    if (response.data.success) {
      Setlist(response.data.data);
      
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  const removeFood=async(foodId)=>{
    const responce =await axios.post(`${url}/api/category/remove`,{id:foodId})
    await fetchList();
    if (responce.data.success) {
      toast.success(responce.data.message);
      
    }
    else{
      toast.error("Error");
    }
}
const handleEditPopup=async(fooddetails)=>{
    categorysetEditpopup(!categoryeditpopup);
  Setcategory(fooddetails);
}
  return (
    <div className="category-main">
      <div className="list-table-all">
        <p>All Categories</p>
        <div className="list-category-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Delete</b>
          <b>Edit</b>
        </div>

        {list.map((item, index) => {
          return (
            <div key={index} className="list-category-table-format">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <img
                onClick={() => removeFood(item._id)}
                className="delete-item"
                src="\Images\bin.png"
                alt=""
              />
              <img
                onClick={() => handleEditPopup(item)}
                className="update-item"
                src="\Images\edit.png"
                alt="edit icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListCategory;
