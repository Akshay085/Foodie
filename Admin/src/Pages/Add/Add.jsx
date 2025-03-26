import React, { useEffect, useState } from "react";
import "./Add.css";
import { Imgs } from "../../assets/Imgs";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from 'react-hot-toast'
import Loader from "../../Components/Animation/Loader";



const Add = ({ showLogin,setShowLogin,url }) => {
  const [image, SetImage] = useState(false);
  const [loading,setLoading]=useState(false);
  const [categorylist, setcategoryList] = useState([]);
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
    setLoading(true);
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
      setLoading(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  const fetchCategorylist = async () => {
    const response = await axios.get(url+"/api/category/list");
    setcategoryList(response.data.data)
  };
  useEffect(() => {
    async function LoadData() {
        await fetchCategorylist();     
    }
    LoadData();
  }, []);
  
   //  console.log(categorylist);

  
  return (
    <div className="add">
      {/* {showLogin==true ?<LoginPopUp  showLogin={showLogin}  setShowLogin={setShowLogin} />:null} */}
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload  flex-col" style={{'alignItems':'start'}}>
          {/* <p>Upload</p> */}
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : Imgs.upload}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => {SetImage(e.target.files[0]);
 // console.log(e.target.files[0])
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
              {categorylist.map((item,i)=><option value={item.name} key={i}>{item.name}</option>)}
              
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
        
           
        

<button type="submit" className="add-food-button center-content">
  {loading ? <div className="center-content">
        <Loader /> 
</div> : 'ADD'}
</button>


      </form>
    </div>
  );
};

export default Add;
