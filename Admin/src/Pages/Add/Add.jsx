import React, { useEffect, useState } from "react";
import "./Add.css";
import { Imgs } from "../../assets/Imgs";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, SetImage] = useState(false);
  const [category, setCategory] = useState(false);
  const [categoryimg, setCategoryimg] = useState(false);
  const [data, SetData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Burger",
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
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      SetData({
        name: "",
        description: "",
        price: "",
        category: "Burger",
      });
      SetImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  const toggleCategory = () => {
    setCategory(!category);
  };
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload  flex-col" style={{'alignItems':'start'}}>
          <p>Upload</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : Imgs.upload}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => {SetImage(e.target.files[0]);
  console.log(e.target.files[0])
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="5"
            placeholder="Write Content Here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="FrenchFries">FrenchFries</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pasta">Pasta</option>
              <option value="Frankie">Frankie</option>
              <option value="Beverages">Beverages</option>
              <option value="Desert">Desert</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              required
            />
          </div>
        </div>
        <div className="add-category">
          <button onClick={toggleCategory}>Add New Category</button>
        </div>
        {category ? (
          <div className="addcategory-model">
            
            <div className="form">
              <form action="">
                <label htmlFor="image">
                  <img
                    src={image ? URL.createObjectURL(image) : Imgs.upload}
                    alt="upload"
                  />
                </label>
                <input
                  onChange={(e) => setCategoryimg(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  required
                />
                <br />
                <label>Category Name:</label>
                <input type="text" name="categoryname" id=""/>
                <button type="submit">Add Category</button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
