import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./Search.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../../components/Food-Item/FoodItem";
import axios from "axios";
import Errormessage from "../../components/Errormessage/Errormessage";
import { IconButton} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import Loaderfrount from "../../components/MyLottieAnimation/Loaderfrount";

const Search = () => {
  const { foodlist, url } = useContext(StoreContext);
  const [inputvalue, setInputvalue] = useState("");
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleChange = (event) => {
    setInputvalue(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/food/search?name=${inputvalue}`
      );

      setFoods(response);
    } catch (error) {
      console.log("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = foodlist.filter((foodname) =>
    foodname.name.toLowerCase().includes(inputvalue.toLowerCase())
  );
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="search-box-main">
      {loading==true ?<Loaderfrount />:null}
      <div className="search-header">
      <IconButton
            color="inherit"
            sx={{ color: "red" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        <h1>All Foods</h1>{" "}
        <div className="search-box">
          <input
            type="text"
            value={inputvalue}
            onChange={handleChange}
            placeholder="Search..."
            className="search-input"
          />
          
          {/* <button onClick={handleSearch} className="search-button">
            Search
          </button> */}
        </div>
      </div>

      <div className="view-menu">
        {!inputvalue ? null : filteredFoods.length > 0 ? (
          filteredFoods.map((item, i) => (
            <FoodItem
              key={i}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <Errormessage message="No items found matching your search." />
        )}
      </div>

      <hr className="hr-serach" />

      <div className="view-menu">
        {foodlist.map((item, i) => (
          <FoodItem
            key={i}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
