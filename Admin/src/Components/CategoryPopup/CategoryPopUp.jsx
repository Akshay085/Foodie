import React, { useState, useEffect } from "react";
import "./CategoryPopup.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../Animation/Loader";

const CategoryPopUp = ({
  url,
  categoryeditpopup,
  categorysetEditpopup,
  category,
  Setcategory,
}) => {
  const [image, SetImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ name: "", image: "" });

  useEffect(() => {
    if (category) {
      setInput({ name: category.name, image: category.image });
    }
  }, [category]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const editItem = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("_id", category._id);
    formData.append("name", input.name);
    formData.append("image", image || input.image);

    try {
      const response = await axios.post(`${url}/api/category/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        Setcategory((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === category._id ? { ...cat, name: input.name, image: image || input.image } : cat
          )
        );
        toast.success(response.data.message);
        categorysetEditpopup(false);
      } else {
        toast.error("Error: Try Again");
      }
    } catch (error) {
      toast.error("Error updating item");
      console.log("Error updating item:", error.response?.data || error.message);
    }
    setLoading(false);
  };

  const closeEditpopup = () => {
    categorysetEditpopup(false);
  };

  return (
    <div className="category-popup-main">
      <div className="edit-box">
        <div className="edit-title">
          <h1>Edit Item</h1>
          <img onClick={closeEditpopup} src="/cross_icon.png" alt="cancel" />
        </div>
        <div className="edit-info-container">
          <form onSubmit={editItem}>
            <div className="add-image-upload flex-col">
              <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : input.image} alt="upload" />
              </label>
              <input
                onChange={(e) => SetImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </div>
            <div className="edit-info">
              <input
                type="text"
                placeholder="Category name"
                name="name"
                value={input.name}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="edit-button" style={{ display: "flex", justifyContent: "center" }}>
              <button className="add-food-button center-content" type="submit">
                {loading ? <Loader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryPopUp;
