import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [foodlist, setFoodList] = useState([]);
  const addtoCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removefromCart =async(itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodlist.find((product) => product._id == item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    async function LoadData() {
        await fetchFoodlist();
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartdata(localStorage.getItem("token"));
          }
    }
    LoadData();
  }, []);

  const fetchFoodlist = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  };
  const loadCartdata= async(token)=>{
    const  response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItem(response.data.cartData);
  }

  const contextValue = {
    foodlist,
    cartItems,
    url,
    token,
    setCartItem,
    addtoCart,
    removefromCart,
    getTotalCartAmount,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
