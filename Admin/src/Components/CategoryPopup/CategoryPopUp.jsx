import React from "react";
import "./CategoryPopup.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast'
const CategoryPopUp = ({
  url,
  categoryeditpopup,
  categorysetEditpopup,
  category,
  Setcategory,
}) => {
  console.log(category);
  const [image, SetImage] = useState(false);
  console.log("image", image);

  const [input, setInput] = useState({
    name: "",
  });
  console.log("input", input);
  useEffect(() => {
    setInput({
      ...input,
      name: category.name,
      image: category.image,
    });
  }, [category]);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((input) => ({ ...input, [name]: value }));
  };
  const editItem = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_id", category._id);
    formData.append("name", input.name);
    formData.append("image", image || input.image); // Ensure this is a valid file

    try {
      const response = await axios.post(`${url}/api/category/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        setInput({
          name: "",
          image: "",
        });
        SetImage(false);
        
        toast.success(response.data.message);
        
      } 
      else {
        toast.error(response.data.message);
      }
    }
     catch (error) {
      console.error(
        "Error updating item:",
        error.response?.data || error.message
      );
    }
  };
  const closeEditpopup = () => {
    categorysetEditpopup(!categoryeditpopup);
  };
  

  return (
    <div className="category-popup-main">
      <div className="edit-box">
        <div className="edit-title">
          <h1>Edit Item</h1>
          <img onClick={closeEditpopup} src="\cross_icon.png" alt="cancel" />
        </div>
        <div className="edit-info-container">
          <form action="" onSubmit={editItem}>
            <div className="add-image-upload  flex-col">
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : category.image}
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
              />
            </div>
            <div className="edit-info">
              <input
                type="text"
                placeholder={"Category name"}
                name="name"
                value={input.name}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="edit-button">
              <button type="submit" onClick={()=>{window.location.reload();}}>submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CategoryPopUp;
