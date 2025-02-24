import React from "react";
import "./AddCategory.css";
import { useState } from "react";
import { Imgs } from "../../assets/Imgs";
import axios from "axios";
import { toast } from 'react-hot-toast'
// import { toast } from "react-toastify";

const AddCategory = ({url}) => {
  
  const [image, SetImage] = useState(false);
  const [data, SetData] = useState({
    name: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    SetData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/category/add`, formData);
    if (response.data.success) {
      SetData({
        name: "",
      });
      SetImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="category-main">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div
          className="add-image-upload  flex-col"
          style={{ alignItems: "start" }}
        >
        
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : Imgs.upload}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => {
              SetImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Combo Name:</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
