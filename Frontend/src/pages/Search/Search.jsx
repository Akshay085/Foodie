import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../../components/Food-Item/FoodItem";
import axios from "axios";
import Errormessage from "../../components/Errormessage/Errormessage";
import { IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";
import Loaderfrount from "../../components/MyLottieAnimation/Loaderfrount";

const Search = () => {
  const { foodlist, url } = useContext(StoreContext);
  const [inputvalue, setInputvalue] = useState("");
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

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

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert("Speech recognition is not supported in your browser. Try using Google Chrome.");
  return;
}

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputvalue(transcript);
      handleSearch();
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const filteredFoods = foodlist.filter((foodname) =>
    foodname.name.toLowerCase().includes(inputvalue.toLowerCase())  ||
  foodname.category.toLowerCase().includes(inputvalue.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="search-box-main">
      {loading && <Loaderfrount />}
      <div className="search-header">
        <IconButton
          color="inherit"
          sx={{
            color: "red",
            transform: "rotate(180deg)",
            "&:hover": { color: "black", background: "white" },
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ExitToAppIcon />
        </IconButton>
        <h1>All Foods</h1>
        <div className="search-box">
          <input
            type="text"
            value={inputvalue}
            onChange={handleChange}
            placeholder="Search..."
            className="search-input"
          />
         <IconButton
  onClick={startListening}
  sx={{
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "transparent",
      color: "red",
    },
    "&:active": {
      backgroundColor: "transparent",
      color: "red",
    },
  }}
>
  <MicIcon />
</IconButton>
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
