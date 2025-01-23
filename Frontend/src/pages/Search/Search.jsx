import React, { useContext } from "react";
import { useState } from "react";
import "./Search.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../../components/Food-Item/FoodItem";
import axios from "axios";

const Search = () => {
  const { foodlist } = useContext(StoreContext);
  const [inputvalue, setInputvalue] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setInputvalue(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios(`/api/food?search=${inputvalue}`);
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="search-box-main">
      <div className="search-box">
        <input
          type="text"
          value={inputvalue}
          onChange={handleChange}
          placeholder="Search..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <h1>All Foods</h1>
      <div className="view-menu">
        {inputvalue === null ? (
           <>
           {foodlist.map((item, i) => {
             return (
               <FoodItem
                 key={i}
                 id={item._id}
                 name={item.name}
                 description={item.description}
                 price={item.price}
                 image={item.image}
               />
             );
           })}
         </>
        ) : (
            <>
            {foods.map((item, i) => {
              return (
                <FoodItem
                  key={i}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
