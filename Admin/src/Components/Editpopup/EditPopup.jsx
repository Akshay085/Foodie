import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./Editpopup.css";
import { toast } from 'react-hot-toast'
// import { toast } from "react-toastify";

const EditPopup = ({ url, editpopup, setEditpopup, food, SetFood }) => {
  console.log(food);
  const [categorylist, setcategoryList] = useState([]);

  const [image, SetImage] = useState(false);
  console.log("image", image);
  
  const [input, setInput] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  console.log("input", input);
  const fetchCategorylist = async () => {
    const response = await axios.get(url+"/api/category/list");
    setcategoryList(response.data.data)
  };
  useEffect(() => {
    setInput({
      ...input,
      name: food.name,
      category: food.category,
      price: food.price,
      description: food.description,
      image: food.image,
    });
    fetchCategorylist();
  }, [food]);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((input) => ({ ...input, [name]: value }));
  };

  
  const editItem = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_id", food._id);
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("price", Number(input.price));
    formData.append("category", input.category);
    formData.append("image", image || input.image); // Ensure this is a valid file

    try {
      const response = await axios.post(`${url}/api/food/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        setInput({
          name: "",
          category: "",
          price: "",
          image: "",
          description: "",
        });
        SetImage(false);
        closeEditpopup();
        window.location.reload();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error updating item:",
        error.response?.data || error.message
      );
    }
  };
  const closeEditpopup = () => {
    setEditpopup(!editpopup);
  };

  return (
    <div className="edit-container">
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
                  src={image ? URL.createObjectURL(image) : food.image}
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
                placeholder={"Food name"}
                name="name"
                value={input.name}
                onChange={onChangeHandler}
                required
              />

              {/* <input
                type="text"
                placeholder={"category"}
                name="category"
                value={input.category}
                onChange={onChangeHandler}
                required
              /> */}
               <select 
              onChange={onChangeHandler}
              value={input.category}
              name="category"
            >
              {categorylist.map((item,i)=><option value={item.name} key={i}>{item.name}</option>)}
              required
            </select>

              <input
                type="text"
                placeholder={"price"}
                name="price"
                value={input.price}
                onChange={onChangeHandler}
                required
              />
              <textarea
                placeholder={"description"}
                name="description"
                value={input.description}
                onChange={onChangeHandler}
                required
              ></textarea>
            </div>
            <div className="edit-button">
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;